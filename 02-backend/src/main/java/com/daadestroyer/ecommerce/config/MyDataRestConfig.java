package com.daadestroyer.ecommerce.config;

import com.daadestroyer.ecommerce.entity.Country;
import com.daadestroyer.ecommerce.entity.Product;
import com.daadestroyer.ecommerce.entity.ProductCategory;
import com.daadestroyer.ecommerce.entity.States;
import com.daadestroyer.ecommerce.repository.CountryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
// Spring will scan this configuration first
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] theUnSupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // Disable the method for Product : PUT , POST , DELETE
        disableHttpMethods(Product.class,config, theUnSupportedActions);

        // Disable the method for ProductCategory : PUT , POST , DELETE
        disableHttpMethods(ProductCategory.class,config, theUnSupportedActions);

        // Disable the method for Country : PUT , POST , DELETE
        disableHttpMethods(Country.class,config, theUnSupportedActions);

        // Disable the method for States : PUT , POST , DELETE
        disableHttpMethods(States.class,config, theUnSupportedActions);

        // call an internal helper method to expose the id
        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass , RepositoryRestConfiguration config, HttpMethod[] theUnSupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration configuration) {
        // expose entity ids

        // get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create array list of all those entity types
        List<Class> entityClass = new ArrayList<>();

        // get entity types for the entities
        for (EntityType tempEntityType : entities) {
            entityClass.add(tempEntityType.getJavaType());
        }

        // expose the entity id's for the array of entity/domain types
        Class[] domainTypes = entityClass.toArray(new Class[0]);
        configuration.exposeIdsFor(domainTypes);
    }
}
