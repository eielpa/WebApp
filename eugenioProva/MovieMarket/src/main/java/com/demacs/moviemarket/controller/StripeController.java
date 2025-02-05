package com.demacs.moviemarket.controller;

import com.demacs.moviemarket.service.PersonalLibraryService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/stripe")
@CrossOrigin(origins = "http://localhost:4200")
public class StripeController {

    @Autowired
    private PersonalLibraryService personalLibraryService;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(@RequestBody Map<String, Object> request) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        String productName = (String) request.get("productName");
        String userNickname = (String) request.get("userNickname");

        // Log per debug
        System.out.println("Product: " + productName);
        System.out.println("User Nickname: " + userNickname);

        // Impostazione dei parametri della sessione di checkout
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                // Importante: indirizza al backend per gestire il successo del pagamento
                .setSuccessUrl("http://localhost:8080/stripe/payment-success?movie=" + productName + "&user=" + userNickname)
                .setCancelUrl("http://localhost:4200/payment-failure")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("eur")
                                                .setUnitAmount(1000L) // Prezzo in centesimi (es. 10,00 EUR)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(productName)
                                                                .build()
                                                )
                                                .build()
                                )
                                .setQuantity(1L)
                                .build()
                )
                .build();

        Session session = Session.create(params);

        Map<String, String> response = new HashMap<>();
        response.put("checkoutUrl", session.getUrl());
        return response;
    }

    /**
     * Al completamento del pagamento, aggiunge il film alla libreria e reindirizza l'utente.
     */
    @GetMapping("/payment-success")
    public RedirectView paymentSuccess(@RequestParam("movie") String movieTitle, @RequestParam("user") String userNickname) {
        // Aggiungi il film alla libreria dell'utente
        //personalLibraryService.addMovieToLibrary(userNickname, movieTitle);

        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:4200/personal-library");
        return redirectView;
    }
}