import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Contact } from './contact-model';
import 'rxjs/add/operator/toPromise';

export const GetContactsUrl: string = 'http://localhost/ContactsManagerWebApi/api/ContactsManager/GetContacts';
export const DeleteContactUrl: string = 'http://localhost/ContactsManagerWebApi/api/ContactsManager/Delete';
export const AddContactUrl: string = 'http://localhost/ContactsManagerWebApi/api/ContactsManager/AddContact';
export const UpdateContactUrl: string = 'http://localhost/ContactsManagerWebApi/api/ContactsManager/UpdateContact';

@Injectable()
export class ContactService {
    public constructor(private _http: Http) {
    }

    public getAllContacts(): Promise<Contact[]> {
        return this._http.get(GetContactsUrl)
            .toPromise()
            .then((response: Response) => response.json() as Contact[])
            .catch(this.handleError.bind(this));
    }

    public deleteContact(contactIdToBeDeleted: number): Promise<any> {
        console.log(contactIdToBeDeleted.toString());
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        let options: RequestOptions = new RequestOptions({ headers: headers });
        return this._http.delete(DeleteContactUrl +"/?id=" + contactIdToBeDeleted.toString(), options)
            .toPromise()
            .then((response: Response) => response.ok)
            .catch(this.handleError.bind(this));
    }

    public addContact(contactToBeAdded: Contact): Promise<number> {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        let options: RequestOptions = new RequestOptions({ headers: headers });
        return this._http.post(AddContactUrl, contactToBeAdded, options)
            .toPromise()
            .then((response: Response) => response.json() as number)
            .catch(this.handleError.bind(this));
    }

    public editContact(contactToBeAdded: Contact): Promise<any> {
        let headers: Headers = new Headers({ 'Content-Type': 'application/json' });
        let options: RequestOptions = new RequestOptions({ headers: headers });
        return this._http.put(UpdateContactUrl, contactToBeAdded, options)
            .toPromise()
            .then((response: Response) => response.ok)
            .catch(this.handleError.bind(this));
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}