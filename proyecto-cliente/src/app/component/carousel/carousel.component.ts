import { Component, Input, OnInit } from '@angular/core';
import { ICarouselItem } from './icarousel-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() items: ICarouselItem[] = [];
  public finalHeight: string | number = 0;
  public currentPosition = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items.forEach((item, index) => {
      item.id = index;
      item.marginLeft = index < 3 ? -100 * index : 0;
    });
    this.finalHeight = `${this.height}px`;
  }

  setCurrentPosition(position: number): void {
    this.currentPosition = position;
    this.items.find(i=>i.id===0).marginLeft = -100*position;
  }

  setNext(): void {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if(nextPosition <= this.items.length -1){
      finalPercentage = 25 * nextPosition;
    } else {nextPosition=0}
    this.currentPosition = nextPosition;
  }

  setBack(): void {
    const backPosition = this.currentPosition > 0 ? this.currentPosition - 1 : this.items.length - 1;
    this.currentPosition = backPosition;
    this.moveCarousel();
  }

  moveCarousel(): void {
    this.items.forEach((item, index) => {
      if (index < this.currentPosition || index >= this.currentPosition + 3) {
        item.marginLeft = -100;
      } else {
        item.marginLeft = -100 * (index - this.currentPosition);
      }
    });
  }

  compras(){
    this.router.navigateByUrl('/compras');
  }
}
