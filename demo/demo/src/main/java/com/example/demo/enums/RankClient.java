package com.example.demo.enums;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum RankClient {
    NONE(0, 0.0),
    SILVER(5000000, 2.0),
    GOLD(20000000, 5.0),
    PLATINUM(50000000, 7.0);

    final long minPoints;
    final double discount;
}
