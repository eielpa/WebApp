import { Component } from '@angular/core';
import {CheckoutComponent} from "../checkout/checkout.component";

@Component({
    selector: 'app-checkout-page',
    templateUrl: './checkout-page.component.html',
    standalone: true,
    imports: [
        CheckoutComponent
    ],
    styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {}
