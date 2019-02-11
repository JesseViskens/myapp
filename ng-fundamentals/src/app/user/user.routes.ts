import { ProfileComponent } from './profile.component';
import { LoginComponent } from './login.component';

export const userRoutes = [
    //lijkt op url = /profile
    // is eigenlijk /user/profile -> de routes.ts geeft /user/ door en we plakken er /profile achter
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LoginComponent}
]