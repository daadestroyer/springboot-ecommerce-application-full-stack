package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order,Long> {

    // http://localhost:8081/api/orders/search/findByCustomerEmail?email=shubham@gmail.com
    // select * from orders LEFT OUTER JOIN customer ON orders.customer_id=customer.id WHERE customer.email=:email
    Page<Order> findByCustomerEmailOrderByDateCreatedDesc (@Param("email")String email , Pageable pageable);
}
