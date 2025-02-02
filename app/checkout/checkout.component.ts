import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    standalone: true,
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
    constructor(private paymentService: PaymentService) {}

    payWithPayPal() {
        this.paymentService.createPayment(10, 'USD').subscribe(response => {
            if (response && response.links) {
                const approvalUrl = response.links.find((link: any) => link.rel === 'approval_url');
                if (approvalUrl) {
                    window.location.href = approvalUrl.href;
                }
            }
        });
    }
}
