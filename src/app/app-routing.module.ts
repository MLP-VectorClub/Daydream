import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'app/error/components/not-found.component';

const routes: Routes = [
  {
    path: 'cg',
    loadChildren: () => import('app/color-guide/color-guide.module').then(m => m.ColorGuideModule),
  },
  {
    path: 'colorguide',
    loadChildren: () => import('app/color-guide/color-guide.module').then(m => m.ColorGuideModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cg',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
