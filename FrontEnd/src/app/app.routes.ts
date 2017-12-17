import { StoreComponent } from "./StorePage/store.component"
import { LoginPageComponent } from "./LoginPage/LoginPage.component"
import { RouterModule , Routes }from "@angular/router"
import { HomePageComponent }from "./HomePage/home-page.component"
const APP_ROUTES=[
{ path:'store',component:StoreComponent },
{ pathMatch: 'full',path:'',component:LoginPageComponent },
{ pathMatch: 'full',path:'homePage',component:HomePageComponent }
];
export const routing=RouterModule.forRoot(APP_ROUTES);