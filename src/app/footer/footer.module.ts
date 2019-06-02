import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from 'app/footer/footer.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [FooterComponent],
  exports: [
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class FooterModule {
}
