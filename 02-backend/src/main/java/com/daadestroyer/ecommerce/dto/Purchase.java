package com.daadestroyer.ecommerce.dto;

import com.daadestroyer.ecommerce.entity.Address;
import com.daadestroyer.ecommerce.entity.Customer;
import com.daadestroyer.ecommerce.entity.Order;
import com.daadestroyer.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
