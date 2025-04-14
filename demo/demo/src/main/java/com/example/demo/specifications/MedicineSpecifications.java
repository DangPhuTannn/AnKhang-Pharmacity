package com.example.demo.specifications;


import org.springframework.data.jpa.domain.Specification;

import com.example.demo.dto.request.medicine.AttributeFilter;
import com.example.demo.entity.Attribute;
import com.example.demo.entity.Medicine;
import com.example.demo.entity.MedicineAttribute;
import com.example.demo.enums.AttributeType;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;


public class MedicineSpecifications {
    // public static Specification<Medicine> filterMedicines(
    //         double minPrice, double maxPrice, List<AttributeFilter> filters, String searchValue) {

    //     return (Root<Medicine> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
    //         List<Predicate> predicates = new ArrayList<>();

    //         predicates.add(cb.between(root.get("price"), minPrice, maxPrice));

    //         if (searchValue != null && !searchValue.isEmpty()) {
    //             predicates.add(cb.like(cb.lower(root.get("medicineName")), "%" + searchValue.toLowerCase() + "%"));
    //         }
    //         List<String> simpleAttributes = List.of("brand", "originCountry");
    //         for (AttributeFilter filter : filters) {
    //             if (filter.getAttributeValues() == null || filter.getAttributeValues().isEmpty()) {
    //                 continue;
    //             }

    //             if (simpleAttributes.contains(filter.getAttributeType())) {

    //                 predicates.add(root.get(filter.getAttributeType()).in(filter.getAttributeValues()));
    //             } else {

    //                 Join<Medicine, MedicineAttribute> medicineAttrJoin = root.join("medicineAttributes");
    //                 Join<MedicineAttribute, Attribute> attrJoin = medicineAttrJoin.join("attribute");

    //                 Predicate typePredicate = cb.equal(attrJoin.get("attributeType"),
    //                         AttributeType.valueOf(filter.getAttributeType()));
    //                 Predicate namePredicate = attrJoin.get("name").in(filter.getAttributeValues());

    //                 predicates.add(cb.and(typePredicate, namePredicate));
    //             }
    //         }

    //         return cb.and(predicates.toArray(new Predicate[0]));
    //     };
    // }

    public static Specification<Medicine> hasPriceBetween(double minPrice, double maxPrice) {
        return (root, query, cb) -> cb.between(root.get("price"), minPrice, maxPrice);
    }

    public static Specification<Medicine> hasNameContains(String searchValue) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("medicineName")), "%" + searchValue.toLowerCase() + "%");
    }

    public static Specification<Medicine> hasSimpleAttributeIn(AttributeFilter attributeFilter) {
        return (root, query, cb) -> root.get(attributeFilter.getAttributeType())
                .in(attributeFilter.getAttributeValues());
    }

    public static Specification<Medicine> hasComplexAttributeIn(AttributeFilter attributeFilter) {
        return (root, query, cb) -> {
            Join<Medicine, MedicineAttribute> medicineAttrJoin = root.join("medicineAttributes");
                    Join<MedicineAttribute, Attribute> attrJoin = medicineAttrJoin.join("attribute");
                    Predicate typePredicate = cb.equal(attrJoin.get("attributeType"),
                    AttributeType.valueOf(attributeFilter.getAttributeType()));
            Predicate namePredicate = attrJoin.get("name").in(attributeFilter.getAttributeValues());
            return cb.and(typePredicate,namePredicate);
        };
    }
}
