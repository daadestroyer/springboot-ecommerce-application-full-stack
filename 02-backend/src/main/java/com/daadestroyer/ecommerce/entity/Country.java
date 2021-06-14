package com.daadestroyer.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "country")
@Data
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String code;
    private String name;

    // set-up one to many with states
    @OneToMany(mappedBy = "country")
    @JsonIgnore
    // JsonIgnore will ignore the states
    private List<States> states;
}
