import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserService } from 'app/user/user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [UserService],
})
export class UserModule {
}
