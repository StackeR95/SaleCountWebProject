import { StoreComponent } from "./StorePage/store.component"
import { LoginPageComponent } from "./LoginPage/LoginPage.component"
import { RouterModule , Routes }from "@angular/router"
import { HomePageComponent }from "./HomePage/home-page.component"
import { EditProfileComponent } from'./EditProfilePage/edit-profile.component'
import { ReservedItemsComponent } from './ReservedItemsPage/reserved-items.component'
const APP_ROUTES=[
{ path:'store/:storeId',component:StoreComponent },
{ pathMatch: 'full',path:'',component:LoginPageComponent },
{ path:'homePage',component:HomePageComponent },
{ path:'editProfile',component:EditProfileComponent},
{ path:'reservedItems',component:ReservedItemsComponent}
];
export const routing=RouterModule.forRoot(APP_ROUTES);