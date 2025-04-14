package com.example.demo.specifications;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.example.demo.entity.Client;
import com.example.demo.entity.Order;
import com.example.demo.enums.OrderStatus;

import jakarta.persistence.criteria.Predicate;

public class OrderSpecifications {

    public static Specification<Order> hasNameAndIdContain(String searchValue) {
        return (root, query, cb) -> {
            if (searchValue.trim().length() == 0 || searchValue == null) {
                return cb.conjunction();
            }
            String searchQuery = "%" + searchValue + "%";
            return cb.or(cb.like(cb.lower(root.get("name")), searchQuery),
                    cb.like(cb.lower(root.get("orderId").as(String.class)), searchQuery));
        };
    }

    public static Specification<Order> hasOrderStatusIn(List<OrderStatus> listStatus) {
        return (root, query, cb) -> {
            if (listStatus.isEmpty() || listStatus == null) {
                return cb.conjunction();
            }
            return root.get("orderStatus").in(listStatus);
        };
    }

    public static Specification<Order> hasOrderOfClient(Client client) {
        return (root, query, cb) -> {
            if (client == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("client"), client);
        };
    }

    public static Specification<Order> hasOrderDateBetween(LocalDate startDate, LocalDate endDate) {
        return (root, query, cb) -> {
            Predicate startDatePredicate = cb.greaterThanOrEqualTo(root.get("orderDate"), startDate);
            Predicate endDatePredicate = cb.lessThanOrEqualTo(root.get("orderDate"), endDate);
            return cb.and(startDatePredicate, endDatePredicate);
        };
    }
}
