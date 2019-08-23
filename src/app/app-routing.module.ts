import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin/admin.component';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { FilterproductComponent } from './filterproduct/filterproduct.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AdminGuard } from './admin.guard';
import { GetmessageComponent } from './admin/getmessage/getmessage.component';
import { GetcommandeComponent } from './admin/getcommande/getcommande.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { HistoryComponent } from './admin/history/history.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { DeleteuserComponent } from './admin/deleteuser/deleteuser.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';

const routes: Routes = [

  
     {
       path : 'loginAdmin',
       component : LoginadminComponent
     },
     {
        path : '',
        component : HomeComponent
     },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'aboutus',
        component: AboutusComponent
      },
      {
        path: 'contactus',
        component: ContactusComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path : 'filterproduct',
        component: FilterproductComponent,
      },
      {
        path : 'viewproduct',
        component: ViewproductComponent
      },
 
{
  path: 'admin',
  component: AdminComponent,
  canActivate : [AdminGuard],
  children : [
    { 
      path : 'getmessage',
      component: GetmessageComponent
    },
    {
      path : 'getcommande',
      component : GetcommandeComponent
    },
    {
      path: 'addproduct',
      component: AddproductComponent
    },
    {
      path: 'history',
      component : HistoryComponent
    },
    {
      path: 'adduser',
      component : AdduserComponent
    },
    {
      path : 'deleteuser',
      component: DeleteuserComponent
    }
  ]
  },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
