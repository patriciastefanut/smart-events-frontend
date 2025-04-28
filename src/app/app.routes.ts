import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'account', component: UserComponent,
    },
    {
        path: '**', component: NotFoundComponent
    },
];
