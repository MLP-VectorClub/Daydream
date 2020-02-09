import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'app/header/header.component';
import { SharedModule } from 'app/shared/shared.module';
import { NgbAlertModule, NgbButtonsModule, NgbCollapseModule, NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';

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
    ReactiveFormsModule,
    NgbButtonsModule,
    NgbAlertModule,
    HighlightModule,
  ],
})
export class HeaderModule {
}
