package com.daadestroyer.ecommerce.repository;

import com.daadestroyer.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin("http://localhost:4200")
public interface ProductRepo extends JpaRepository<Product, Long> {


  public Page<Product> findProductByCategoryId(@RequestParam("id") Long id , Pageable pageable);
}
