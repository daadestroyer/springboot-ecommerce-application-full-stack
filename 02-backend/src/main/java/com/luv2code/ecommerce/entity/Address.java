package com.luv2code.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="address")
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="addr1")
    private String addr1;

    @Column(name="addr2")
    private String addr2;

    @Column(name="country")
    private String country;

    @Column(name="state")
    private String state;

    @Column(name="zip")
    private String zip;

    @Column(name="city")
    private String city;
    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;
}





