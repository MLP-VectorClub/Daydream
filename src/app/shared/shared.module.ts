import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'app/core/core.module';
import {
  AvatarWrapComponent,
  BreadcrumbsComponent,
  ContentComponent,
  MainComponent,
  PageHeaderComponent,
  PaginationComponent,
  TimeComponent,
  UserLinkComponent,
} from 'app/shared/components';
import { AboveContentComponent } from 'app/shared/components/above-content.component';
import { VarDirective } from 'app/shared/directives';
import { AvatarShapePipe, PermissionPipe, RoleLabelPipe } from 'app/shared/pipes';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

const declarations = [
  // Components
  ContentComponent,
  AvatarWrapComponent,
  UserLinkComponent,
  TimeComponent,
  BreadcrumbsComponent,
  MainComponent,
  PageHeaderComponent,
  PaginationComponent,
  AboveContentComponent,

  // Directives
  VarDirective,

  // Pipes
  AvatarShapePipe,
  RoleLabelPipe,
  PermissionPipe,
  // SpriteUrlPipe,
  // AppearancePagePipe,
  // PaletteUrlPipe,
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    NgbPopoverModule,
  ],
  exports: [
    ...declarations,
    CoreModule,
    TranslateModule,
    RouterModule,
  ],
  declarations
})
export class SharedModule {
}
