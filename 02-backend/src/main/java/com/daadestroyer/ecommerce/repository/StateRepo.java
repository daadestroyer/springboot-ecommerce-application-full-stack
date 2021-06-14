package com.daadestroyer.ecommerce.repository;

import com.daadestroyer.ecommerce.entity.States;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "states" , path = "states")
public interface StateRepo extends JpaRepository<States,Integer> {


    // http://localhost:8081/api/states/search/findByCountryCode?code=IN
    List<States> findByCountryCode(@Param("code")String code);


}
