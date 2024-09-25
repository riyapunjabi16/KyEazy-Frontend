import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Self,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { Selfie } from 'src/app/models/selfie.model';
import { setSelfie } from 'src/app/redux/actions/selfie.actions';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.scss'],
})
export class SelfieComponent {
  @Input() stepper!: MatStepper;

  @ViewChild('video')
  public video: any;
  @ViewChild('canvas')
  public canvas: any;
  public stream: any;
  public captured: boolean;
  public camera: boolean;
  public image: string;
  public breakpoint!: Breakpoint;
  public height!: number;
  public width!: number;

  constructor(
    public store: Store<{
      documents: Selfie;
      breakpoint: Breakpoint;
    }>
  ) {
    this.captured = false;
    this.camera = false;
    this.image = '';
    this.height = 300;
    this.width = 300;

    this.store.select('breakpoint').subscribe((breakpoint) => {
      this.breakpoint = breakpoint;
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

  async startCamera() {
    this.camera = true;
    await this.setupDevices();
  }

  capture() {
    this.captured = true;
    this.draw(this.video.nativeElement);
    for (let track of this.stream.getTracks()) {
      track.stop();
    }
  }

  retry() {
    this.captured = false;
    this.camera = true;
    this.startCamera();
  }

  async save() {
    const response = await fetch(this.image);
    const blob = await response.blob();
    const imageFile = new File([blob], 'name.png', { type: 'image/png' });
    let selfie = {} as Selfie;
    selfie.image = imageFile;
    selfie.imageBlob = blob;
    this.store.dispatch(setSelfie(selfie));
    this.stepper.next();
  }

  draw(image: any) {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.width, this.height);
    this.image = this.canvas.nativeElement.toDataURL('image/png');
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.video.nativeElement.srcObject = this.stream;
        this.video.nativeElement.play();
      } catch (e) {
        console.error(e);
      }
    }
  }

  back() {
    this.stepper.previous();
  }
}
