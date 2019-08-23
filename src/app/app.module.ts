import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Control } from './control';
import { FilterproductComponent } from './filterproduct/filterproduct.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ViewproductComponent } from './viewproduct/viewproduct.component';
import { GetmessageComponent } from './admin/getmessage/getmessage.component';
import { GetcommandeComponent } from './admin/getcommande/getcommande.component';
import { AddproductComponent } from './admin/addproduct/addproduct.component';
import { HistoryComponent } from './admin/history/history.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { DeleteuserComponent } from './admin/deleteuser/deleteuser.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { environment } from '../environments/environment';
const config: SocketIoConfig = { url: environment.api_url_socket, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    NavbarComponent,
    ProductComponent,
    AdminComponent,
    FooterComponent,
    FilterproductComponent,
    ViewproductComponent,
    GetmessageComponent,
    GetcommandeComponent,
    AddproductComponent,
    HistoryComponent,
    AdduserComponent,
    DeleteuserComponent,
    LoginadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Control,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
