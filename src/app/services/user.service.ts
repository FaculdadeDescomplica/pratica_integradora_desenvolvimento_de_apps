import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL: string = 'http://192.168.0.34:3000/';
  constructor(private http: HttpClient) { }

  /**  GET user api Gell All Custmoer Function  */
  getUsers(): Observable<User[]> {
    var url: string = this.BASE_URL + 'users';
    return this.http.get<User[]>(url)
  }
  /**  POST  user api  ADD User Function  */
  addUser(user: any): Observable<User> {
    console.log(user);
    var url: string = this.BASE_URL + 'users';
    return this.http.post<User>(url, user, httpOptions);
  }

  /**  PUT user api EDIT User Function  */
  editUser(user: any): Observable<User> {
    var url: string = this.BASE_URL + 'users' + user.id;;
    return this.http.put<User>(url, user, httpOptions);

  }

  /** DELETE: delete user Function*/
  deleteUser(user: User | string): Observable<User> {
    const id = typeof user === 'string' ? user : user.id;
    var url: string = this.BASE_URL + 'api/v1/user' + id;
    return this.http.delete<User>(url, httpOptions);

  }



}
