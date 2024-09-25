import { AfterContentInit, Input, OnDestroy } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';

@Directive({
  selector: '[carousel-slide]',
})
export class CarouselSlide {
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnDestroy
{
  @ContentChildren(CarouselSlide) slides!: QueryList<CarouselSlide>;
  @Input() name!: string;

  public currentSlide: number;

  constructor() {
    this.currentSlide = 0;
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  ngAfterContentInit() {}

  ngAfterViewInit() {}

  onNextClick(): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    document
      .getElementById(this.name + this.currentSlide.toString())
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
  }

  onPrevClick(): void {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    document
      .getElementById(this.name + this.currentSlide.toString())
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
  }
}
