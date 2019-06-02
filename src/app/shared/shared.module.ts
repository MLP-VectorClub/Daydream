import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'app/core/core.module';
import {
  AvatarWrapComponent,
  ContentComponent,
  SidebarComponent,
  SidebarUserInfoComponent,
  TimeComponent,
  UserLinkComponent,
} from 'app/shared/components';
import { VarDirective } from 'app/shared/directives';
import { AvatarShapePipe, RoleLabelPipe } from 'app/shared/pipes';
import { PermissionPipe } from 'app/shared/pipes/permission.pipe';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const declarations = [
  // Components
  SidebarComponent,
  ContentComponent,
  AvatarWrapComponent,
  SidebarUserInfoComponent,
  UserLinkComponent,
  TimeComponent,

  // Directives
  VarDirective,

  // Pipes
  AvatarShapePipe,
  RoleLabelPipe,
  PermissionPipe,
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
