/**
 * Created by KeilCarpenter on 12-Jul-17.
 */

import {Http, Headers, Response} from "@angular/http";
import {User} from "../../models/user.model";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class AuthenticationService{
    constructor(private http: Http, private errorService: ErrorService){}

    signUp(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type' : 'application/json'});

        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }

    signIn(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type' : 'application/json'});

        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }

    logout(){
        // Delete token and userId
        localStorage.clear();
    }

    isLoggedIn(){
        // Check if token exists
        return localStorage.getItem('token') !== null
    }
}