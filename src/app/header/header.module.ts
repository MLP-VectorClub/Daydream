import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'app/header/header.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class HeaderModule {
}
