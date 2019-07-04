import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    // I wanted the service to return only one object, but i'll try the alternate method of returning it
    // in the detail componenet
    getProduct(id: number): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log(data.filter(product => product.productId === id))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
