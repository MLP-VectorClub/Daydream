import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'app/header/header.component';
import { SharedModule } from 'app/shared/shared.module';
import { NgbCollapseModule, NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbPopoverModule,
  ],
})
export class HeaderModule {
}
