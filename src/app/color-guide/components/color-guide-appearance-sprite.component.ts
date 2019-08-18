import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { SpriteUrlPipe } from 'app/shared/pipes';
import { Appearance, Nullable, Status } from 'app/types';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-color-guide-appearance-sprite',
  templateUrl: './color-guide-appearance-sprite.component.html',
  styleUrls: ['./color-guide-appearance-sprite.component.scss'],
})
export class ColorGuideAppearanceSpriteComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  appearance: Appearance;

  @ViewChild('imageTag', { static: false })
  imageEl: ElementRef<HTMLImageElement>;

  Status = Status;

  imageSource$ = new BehaviorSubject<Nullable<string>>(null);
  status = Status.INIT;
  visible = false;
  spriteUrlPipe = new SpriteUrlPipe();
  loadSubscription: Nullable<Subscription> = null;

  isBrowser: boolean;

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadFullSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { appearance } = changes;
    if (appearance && appearance.currentValue) {
      const value = appearance.currentValue as Appearance;
      if (value.sprite && value.sprite.preview) {
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

  onIntersection({ visible }: { visible: boolean }) {
    if (!this.isBrowser || this.visible || !visible)
      return;

    this.visible = true;
    this.loadFullSize();
  }

  private loadFullSize() {
    if (!this.appearance || !this.visible)
      return;

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
