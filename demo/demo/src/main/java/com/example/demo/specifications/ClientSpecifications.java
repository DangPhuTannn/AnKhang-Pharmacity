package com.example.demo.specifications;

import java.time.LocalDate;

import org.springframework.data.jpa.domain.Specification;

import com.example.demo.entity.Client;
import jakarta.persistence.criteria.Predicate;

public class ClientSpecifications {

    public static Specification<Client> hasStartDateBetween(LocalDate startDate, LocalDate endDate) {
        return (root, query, cb) -> {
            Predicate startDatePredicate = cb.greaterThanOrEqualTo(root.get("startDate"), startDate);
            Predicate endDatePredicate = cb.lessThanOrEqualTo(root.get("startDate"), endDate);
            return cb.and(startDatePredicate, endDatePredicate);
        };
    }
}
