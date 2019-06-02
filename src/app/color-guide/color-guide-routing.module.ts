import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorGuideComponent } from 'app/color-guide/color-guide.component';

const routes: Routes = [
  {
    path: ':guide',
    pathMatch: 'full',
    component: ColorGuideComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pony',
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class ColorGuideRoutingModule {
}
