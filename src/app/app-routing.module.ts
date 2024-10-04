import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./business/view/page/main/main.component";
import {RolesGuard} from './business/guard/roles.duard';
import {UserRoleAuth} from "./app.constant";
import {AccessDeniedComponent} from "./auth/page/access-denied/access-denied.component";

const routes: Routes = [
  { path: '',
    component: MainComponent,
    canActivate: [RolesGuard],
    data: {
    allowedRoles: [
      UserRoleAuth.ADMIN,
      UserRoleAuth.USER,
      UserRoleAuth.VIEW,
    ]
    }
  },
  {path: 'index', redirectTo: '', pathMatch: 'full'},
  {path: 'access-denied', component: AccessDeniedComponent},
  {path: '**', redirectTo: '/'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
