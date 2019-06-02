import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
  SidebarComponent,
  SidebarUserInfoComponent,
  TimeComponent,
  UserLinkComponent,
} from 'app/shared/components';
import { VarDirective } from 'app/shared/directives';
import { AvatarShapePipe, PermissionPipe, RoleLabelPipe, SpriteUrlPipe } from 'app/shared/pipes';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const declarations = [
  // Components
  SidebarComponent,
  ContentComponent,
  AvatarWrapComponent,
  SidebarUserInfoComponent,
  UserLinkComponent,
  TimeComponent,
  BreadcrumbsComponent,
  MainComponent,
  PageHeaderComponent,
  PaginationComponent,

  // Directives
  VarDirective,

  // Pipes
  AvatarShapePipe,
  RoleLabelPipe,
  PermissionPipe,
  SpriteUrlPipe,
];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    NgZorroAntdModule,
    RouterModule,
  ],
  exports: [
    ...declarations,
    CoreModule,
    TranslateModule,
    NgZorroAntdModule,
    RouterModule,
  ],
  declarations,
})
export class SharedModule {
}
