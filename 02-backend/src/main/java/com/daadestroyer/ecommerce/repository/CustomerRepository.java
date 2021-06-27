package com.daadestroyer.ecommerce.repository;

import com.daadestroyer.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
