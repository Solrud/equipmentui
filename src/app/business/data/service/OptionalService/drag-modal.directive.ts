import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appDraggableModal]'
})
export class DragModalDirective implements OnInit, OnDestroy {
  private active = false;
  private currentX: number;
  private currentY: number;
  private initialX: number;
  private initialY: number;
  private xOffset = 0;
  private yOffset = 0;
  private maxOffsetYUp: number;
  private maxOffsetYDown: number;
  private maxOffsetX: number;
  private modalBody: any;
  private modalHeader: any;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.setInitParams();
    });
  }

  ngOnDestroy() {
    this.removeEventListeners();
  }

  reset() {
    this.xOffset = 0;
    this.yOffset = 0;

    this.modalBody.style.top = '';
    this.modalBody.style.left = '';
  }

  updateEventElements() {
    this.removeEventListeners();
    this.setInitParams();
  }

  private setInitParams() {
    this.modalHeader = this.elementRef.nativeElement.querySelector('.modal-header');
    this.modalBody = this.elementRef.nativeElement.querySelector('.body');

    if (this.modalHeader) {
      this.modalHeader.style.cursor = 'all-scroll';
      this.modalHeader.addEventListener('mousedown', this.dragStart, true);
      document.addEventListener('mouseup', this.dragEnd, true);
      document.addEventListener('mousemove', this.drag, true);
    }
  }

  private removeEventListeners() {
    if (this.modalHeader) {
      this.modalHeader.removeEventListener('mousedown', this.dragStart, true);
      document.removeEventListener('mouseup', this.dragEnd, true);
      document.removeEventListener('mousemove', this.drag, true);
    }
  }

  private initDragLimits() {
    this.maxOffsetX = this.modalBody.offsetLeft - this.xOffset;
    this.maxOffsetYUp = this.modalBody.offsetTop - this.yOffset;
    this.maxOffsetYDown = window.innerHeight - (this.modalBody.offsetTop + this.modalBody.offsetHeight) + this.yOffset;
  }

  private dragStart = (event: MouseEvent) => {
    this.initDragLimits();

    this.initialX = event.clientX - this.xOffset;
    this.initialY = event.clientY - this.yOffset;
    this.active = true;
  };

  private dragEnd = () => {
    this.active = false;
  };

  private drag = (event: MouseEvent) => {
    if (this.active) {
      event.preventDefault();

      const previousX = this.currentX;
      const previousY = this.currentY;

      this.currentX = event.clientX - this.initialX;
      this.currentY = event.clientY - this.initialY;

      if (this.currentX < -this.maxOffsetX && this.currentX < previousX) {
        this.currentX = -this.maxOffsetX;
      } else if (this.currentX > this.maxOffsetX && this.currentX > previousX) {
        this.currentX = this.maxOffsetX;
      }

      if (this.currentY < -this.maxOffsetYUp && this.currentY < previousY) {
        this.currentY = -this.maxOffsetYUp;
      } else if (this.currentY > this.maxOffsetYDown && this.currentY > previousY) {
        this.currentY = this.maxOffsetYDown;
      }

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      this.setPosition(this.currentX, this.currentY);
    }
  };

  private setPosition(left: number, top: number) {
    this.modalBody.style.top = top + 'px';
    this.modalBody.style.left = left + 'px';
  }
}
