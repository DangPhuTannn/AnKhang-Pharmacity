package com.example.demo.dto.response.attribute;

import com.example.demo.enums.AttributeType;

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
public class AttributeResponse {
    int attributeId;
    String name;
    String description;
    AttributeType attributeType;
}
