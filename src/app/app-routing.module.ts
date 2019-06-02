import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cg',
    loadChildren: 'app/color-guide/color-guide.module#ColorGuideModule',
  },
  {
    path: 'colorguide',
    loadChildren: 'app/color-guide/color-guide.module#ColorGuideModule',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cg',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
