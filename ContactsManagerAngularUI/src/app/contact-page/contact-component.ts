import { Component, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import Contactservice = require("./service/contact-service");
import ContactService = Contactservice.ContactService;
import Contactmodel = require("./service/contact-model");
import Contact = Contactmodel.Contact;

@Component({
    selector: 'contact-manager',
    templateUrl: './contact-component.html',
    providers: [ContactService],
    styleUrls: []
})
export class ContactManagerComponent {
    private _contacts: Contact[];
    private _contactUnderChange: Contact;
    private _indexBeingEdited: number;
    private _isEditing: boolean=false;
    private falseFlag: boolean = false;
    private addedContactId: number;
    private _isAddEditPaneVisible: boolean;

    public constructor(private _contactService: ContactService) {}

    public ngOnInit(): void {
        this.getContacts();
    }

    public getContacts(): void {
        this._contactService.getAllContacts()
            .then((data: Contact[]) =>
                this._contacts = data
            );
    }

    public deleteRowClicked(index: number): void {
        this._contactService.deleteContact(this._contacts[index].Id);
        this._contacts.splice(index, 1);
    }

    public editRowClicked(index: number): void {
        this._isEditing = true;
        this._contactUnderChange = this._contacts[index];
        this._isAddEditPaneVisible = true;
        this._indexBeingEdited = index;
    }

    public addContact(): void {
        this._isEditing = true;
        this._contactUnderChange = new Contact("", "", "", "", true, 0);
        this._isAddEditPaneVisible = true;
    }

    public saveUpdateChanges(): void {
        if (this._isEditing) {
            this._contactService.editContact(this._contactUnderChange);
            this._contacts[this._indexBeingEdited] = this._contactUnderChange;

        } else {
            this._contactService.addContact(this._contactUnderChange)
                .then((data: number) => this.addedContactId = data);
            this._contactUnderChange.Id = this.addedContactId;
            this._contacts.push(this._contactUnderChange);
        }
        this._isEditing = false;
    }
}