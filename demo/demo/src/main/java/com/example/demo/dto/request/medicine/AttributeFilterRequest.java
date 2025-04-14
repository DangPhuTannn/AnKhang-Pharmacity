package com.example.demo.dto.request.medicine;

import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AttributeFilterRequest {
    MedicinePrice priceRange;
    List<AttributeFilter> listAttributeFilters;
    String sortOrder;
    String searchValue;
}
