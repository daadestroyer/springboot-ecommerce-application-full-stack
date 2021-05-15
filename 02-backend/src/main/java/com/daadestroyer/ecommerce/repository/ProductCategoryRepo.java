package com.daadestroyer.ecommerce.repository;

import com.daadestroyer.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepo extends JpaRepository<ProductCategory, Long> {
}
