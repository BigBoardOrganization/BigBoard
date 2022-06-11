import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      { path: '', loadChildren: () => import("./pages/main/main.module").then( module => module.MainModule) },
      { path: 'category/:id', loadChildren: () => import("./pages/main/main.module").then( module => module.MainModule) },
    ]
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
