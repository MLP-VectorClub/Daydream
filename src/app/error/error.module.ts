import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from 'app/error/components/not-found.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class ErrorModule {
}
