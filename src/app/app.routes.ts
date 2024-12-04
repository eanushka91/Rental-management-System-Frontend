import { Routes } from '@angular/router';
import { ItemPageComponent } from './item-page/item-page.component';
import { RentalPageComponent } from './rental-page/rental-page.component';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [

    {
        path:"",
        component:NavigationComponent,
        children:[
            {
                path:"item",
                component:ItemPageComponent   
            },
            {
                path:"rental",
                component:RentalPageComponent
            }
        ]}
    
];
