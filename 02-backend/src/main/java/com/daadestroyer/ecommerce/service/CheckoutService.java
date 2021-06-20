package com.daadestroyer.ecommerce.service;

import com.daadestroyer.ecommerce.dto.Purchase;
import com.daadestroyer.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
