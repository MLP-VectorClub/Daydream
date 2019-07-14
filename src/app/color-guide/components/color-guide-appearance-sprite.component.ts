import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { SpriteUrlPipe } from 'app/shared/pipes';
import { Appearance, Status } from 'app/types';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-color-guide-appearance-sprite',
  templateUrl: './color-guide-appearance-sprite.component.html',
  styleUrls: ['./color-guide-appearance-sprite.component.scss'],
})
export class ColorGuideAppearanceSpriteComponent implements OnChanges, OnDestroy {

  @Input()
  appearance: Appearance;

  @ViewChild('imageTag')
  imageEl: ElementRef<HTMLImageElement>;

  Status = Status;

  imageSource$ = new BehaviorSubject(null);
  status = Status.INIT;
  visible = false;
  spriteUrlPipe = new SpriteUrlPipe();
  loadSubscription: Subscription = null;

  constructor(private http: HttpClient) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { appearance } = changes;
    if (appearance && appearance.currentValue) {
      const value = appearance.currentValue as Appearance;
      if (value.sprite) {
        this.imageSource$.next(value.sprite.preview);
        this.loadFullSize();
      }
    }
  }

  ngOnDestroy(): void {
    this.visible = false;
    this.unsub();
  }

  private unsub() {
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
      this.loadSubscription = null;
    }
  }

  onIntersection({ target, visible }: { target: HTMLElement, visible: boolean }) {
    if (this.visible || !visible || !target.isSameNode(this.imageEl.nativeElement))
      return;

    this.visible = true;
    this.loadFullSize();
  }

  private loadFullSize() {
    if (!this.appearance || !this.visible) {
      return;
    }

    this.status = Status.LOAD;
    const spriteUrl = this.spriteUrlPipe.transform(this.appearance);
    this.unsub();
    this.loadSubscription = this.http.get(spriteUrl, { responseType: 'blob' }).subscribe(
      () => {
        this.status = Status.YAY;
        this.imageSource$.next(spriteUrl);
      },
      () => this.status = Status.NAY,
      () => this.loadSubscription = null,
    );
  }
}
