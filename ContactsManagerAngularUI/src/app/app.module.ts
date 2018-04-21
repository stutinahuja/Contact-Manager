import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import Contactcomponent = require("./contact-page/contact-component");
import ContactComponent = Contactcomponent.ContactManagerComponent;

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
  declarations: [ AppComponent, ContactComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
