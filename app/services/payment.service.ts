import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private apiUrl = 'https://api.sandbox.paypal.com/v1/payments/payment'; // Usa API sandbox per test

    constructor(private http: HttpClient) {}

    createPayment(amount: number, currency: string): Observable<any> {
        const paymentData = {
            intent: 'sale',
            payer: { payment_method: 'paypal' },
            transactions: [{ amount: { total: amount, currency: currency } }],
            redirect_urls: {
                return_url: 'http://localhost:4200/payment-success',
                cancel_url: 'http://localhost:4200/payment-cancel',
            },
        };

        return this.http.post<any>(`${this.apiUrl}`, paymentData);
    }
}
