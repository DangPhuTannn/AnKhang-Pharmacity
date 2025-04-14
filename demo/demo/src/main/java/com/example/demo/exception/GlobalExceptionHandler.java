package com.example.demo.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.demo.dto.request.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    // @SuppressWarnings("rawtypes")
    @SuppressWarnings("rawtypes")
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse> handlingRunTimeException(RuntimeException exception) {
        ApiResponse apiResponse = new ApiResponse<>();
        apiResponse.setCode(1000);
        apiResponse.setMessage(exception.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @SuppressWarnings("rawtypes")
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = new ApiResponse<>();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    @SuppressWarnings("rawtypes")
    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeninedException(AccessDeniedException exception) {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;
        return ResponseEntity.status(errorCode.getStatusCode()).body(ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage()).build());
    }

    @SuppressWarnings({ "rawtypes", "null" })
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception) {
        String enumKey = exception.getFieldError().getDefaultMessage();

        ErrorCode errorCode = ErrorCode.KEY_INVALID;
        try {
            errorCode = ErrorCode.valueOf(enumKey);
        } catch (IllegalArgumentException e) {

        }

        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    // để get message từ exception
    // sử dụng exception.getFieldError().getDefaultMessage();
}
