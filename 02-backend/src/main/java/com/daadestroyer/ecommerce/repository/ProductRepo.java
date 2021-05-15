package com.daadestroyer.ecommerce.repository;

import com.daadestroyer.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product, Long> {

}
