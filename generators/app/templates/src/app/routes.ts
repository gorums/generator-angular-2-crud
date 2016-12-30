import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core' 
import { 
    DashboardContainer, 
    HomeContainer, 
    DoctorsContainer, 
    UsersContainer 
} from './containers';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: DashboardContainer,
    children: [
        { path: '', component: HomeContainer },
        { path: 'doctors', component: DoctorsContainer },
        { path: 'users', component: UsersContainer }
    ]
  },
  { path: '**', redirectTo: '' }
]);