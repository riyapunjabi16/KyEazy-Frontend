import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Liveliness } from 'src/app/models/liveliness.model';
import { setLiveliness } from 'src/app/redux/actions/liveliness.actions';
declare var MediaRecorder: any;

@Component({
  selector: 'app-liveliness',
  templateUrl: './liveliness.component.html',
  styleUrls: ['./liveliness.component.scss'],
})
export class LivelinessComponent implements OnInit {
  @Input() stepper!: MatStepper;

  @ViewChild('toCapture')
  public toCapture: any;
  @ViewChild('toPlay')
  public toPlay: any;
  loading!: boolean;
  public camera: boolean;
  public captured: boolean;
  public timeleft: number;
  public chunks: any;
  public audioConstraints: any;
  public videoConstraints: any;
  public mediaRecorder: any;
  public stream: any;
  public blob: any;
  public interval: any;
  public timeout: any;
  public question: string;
  public height!: number;
  public width!: number;

  constructor(
    public store: Store<{ documents: Liveliness; breakpoint: Breakpoint }>
  ) {
    this.camera = false;
    this.captured = false;
    this.chunks = [];
    this.timeleft = 10;
    this.question = '';
    this.videoConstraints = {
      video: {
        facingMode: 'user',
      },
    };
    this.audioConstraints = {
      audio: {
        echoCancellation: true,
      },
    };
    this.getQuestion();

    this.height = 300;
    this.width = 300;

    this.store.select('breakpoint').subscribe((breakpoint) => {
      if (breakpoint.isXs) {
        this.height = 200;
        this.width = 200;
      }
      if (breakpoint.isSm) {
        this.height = 250;
        this.width = 250;
      }
      if (breakpoint.isMd) {
        this.height = 250;
        this.width = 300;
      }
      if (breakpoint.isLg) {
        this.height = 270;
        this.width = 300;
      }
      if (breakpoint.isXl) {
        this.height = 300;
        this.width = 300;
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  async startCamera() {
    this.camera = true;
    await this.setupDevices();
    this.mediaRecorder.start();
    this.timeleft = 10;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.stopCamera(), 1000 * 10);
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.timeleft <= 0) clearInterval(this.interval);
      this.timeleft -= 1;
    }, 1000);
  }

  stopCamera() {
    if (this.mediaRecorder.state === 'inactive') return;
    this.captured = true;
    this.timeleft = 0;
    this.mediaRecorder.stop();
    for (let track of this.stream.getTracks()) {
      track.stop();
    }
  }

  save() {
    const videoFile = new File([this.blob], 'answer.mp4', {
      type: 'video/mp4',
    });
    let liveliness = {} as Liveliness;
    liveliness.video = videoFile;
    liveliness.question = this.question;
    this.store.dispatch(setLiveliness(liveliness));
    this.stepper.next();
  }

  back() {
    this.stepper.previous();
  }

  retry() {
    this.captured = false;
    this.camera = true;
    this.startCamera();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia(
          this.videoConstraints
        );
        const audioStream = await navigator.mediaDevices.getUserMedia(
          this.audioConstraints
        );
        this.stream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
        this.toCapture.nativeElement.srcObject = this.stream;
        this.toCapture.nativeElement.muted = true;
        this.toCapture.nativeElement.play();
        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.ondataavailable = (ev: any) => {
          this.chunks.push(ev.data);
        };
        this.mediaRecorder.onstop = (ev: any) => {
          this.blob = new Blob(this.chunks, { type: 'video/mp4;' });
          let videoURL = window.URL.createObjectURL(this.blob);
          this.toPlay.nativeElement.src = videoURL;
          this.chunks = [];
        };
      } catch (e) {
        console.error(e);
      }
    }
  }

  getQuestion() {
    let operations = ['+', '*'];
    let firstOperand = this.getRandomNumber(1, 5);
    let secondOperand = this.getRandomNumber(1, 5);
    let operator = operations[this.getRandomNumber(1, 1000) % 2];
    this.question = 'what is ' + firstOperand + operator + secondOperand + ' ?';
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
