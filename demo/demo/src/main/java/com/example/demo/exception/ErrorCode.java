package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    KEY_INVALID(9998, "Invalid message key", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(9999, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(999, "You do not have permission", HttpStatus.FORBIDDEN),
    USER_NOT_FOUND(1, "User not exist", HttpStatus.NOT_FOUND),
    CLIENT_NOT_FOUND(2, "Client not exist", HttpStatus.NOT_FOUND),
    USER_DELETED(3, "User has been deleted", HttpStatus.NOT_ACCEPTABLE),
    // ---------------- Medicine --------------
    MEDICINE_NOT_EXIST(1001, "Medicine not exist", HttpStatus.NOT_FOUND),
    MEDICINE_ALREADY_EXIST(1002, "Medicine existed", HttpStatus.BAD_REQUEST),
    // ---------------- Medicine --------------
    // ---------------- Client --------------
    EMAIL_EXISTED(2001, "Email already existed", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_EXISTED(2002, "Email not exist", HttpStatus.NOT_FOUND),
    WRONG_PASSWORD(2003, "Wrong Password", HttpStatus.BAD_REQUEST),
    ONLY_NUM_AND_LENGTH_PHONE(2004, "Phone must only contain digits or have 10 digits", HttpStatus.BAD_REQUEST),
    EMAIL_WRONG_FORM(2005, "Wrong email form", HttpStatus.BAD_REQUEST),
    INVALID_DATE(2006, "Invalid Date", HttpStatus.BAD_REQUEST),

    // ---------------- Client -------------

    // ---------------- Cart --------------
    CARTITEM_NOT_EXIST(3000, "Cart Item not exist", HttpStatus.NOT_FOUND),

    // ---------------- Cart --------------

    // ---------------- Address -----------
    ADDRESS_ID_NOT_EXIST(4000, "Address id not exist", HttpStatus.NOT_FOUND),
    // ---------------- Address -----------

    // ---------------- Order -----------
    ORDER_ID_NOT_EXIST(5000, "Order id not exist", HttpStatus.NOT_FOUND),

    // ---------------- Order -----------

    // ---------------- Attribute -----------
    ATTRIBUTE_NOT_EXIST(6000, "Attribute not exist", HttpStatus.NOT_FOUND),
    ATTRIBUTE_TYPE_NOT_EXIST(6001, "Attribute type not exist", HttpStatus.NOT_FOUND),

    // ---------------- Attribute -----------

    // ---------------- OrderStatus -----------
    ORDERSTATUS_NOT_EXIST(7000, "Order status not exist", HttpStatus.NOT_FOUND);

    // ---------------- OrderStatus -----------
    private int code;
    private String message;
    private HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

}
