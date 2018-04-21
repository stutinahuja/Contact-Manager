import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import Contactcomponent = require("./contact-component");
import ContactComponent = Contactcomponent.ContactManagerComponent;
import Contactservice = require("./service/contact-service");
import ContactService = Contactservice.ContactService;

@NgModule({
    imports: [
        RouterModule,
        HttpModule
        ],
    declarations:
    [
        ContactComponent,
    ],
    providers: [
        ContactService
    ],
})

export class ContactModule { }