package com.example.demo.dto.response.attribute;

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
public class AllAttributeResponse {
    List<AttributeResponse> categories;
    List<AttributeResponse> indications;
    List<AttributeResponse> flavorOrScents;
    List<AttributeResponse> targetPatiences;
    List<AttributeResponse> skinTypes;
}
