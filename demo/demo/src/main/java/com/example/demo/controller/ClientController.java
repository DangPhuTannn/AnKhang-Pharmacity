package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.request.ApiResponse;
import com.example.demo.dto.request.DateRangeRequest;
import com.example.demo.dto.response.client.ClientResponse;
import com.example.demo.service.ClientService;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ClientController {

    ClientService clientService;

    @GetMapping
    ApiResponse<List<ClientResponse>> getClients() {
        return ApiResponse.<List<ClientResponse>>builder()
                .result(clientService.getClients())
                .build();
    }

    @GetMapping("/getClient/{client_id}")
    ApiResponse<ClientResponse> getClient(@PathVariable int client_id) {
        return ApiResponse.<ClientResponse>builder()
                .result(clientService.getClient(client_id))
                .build();
    }

    @GetMapping("/myInfor/{email}")
    ApiResponse<ClientResponse> getMyInfor(@PathVariable String email) {
        return ApiResponse.<ClientResponse>builder()
                .result(clientService.getMyInfor(email))
                .build();
    }

    @PostMapping("/getClientsByDateRange")
    ApiResponse<List<ClientResponse>> getClientsByDateRange(@RequestBody DateRangeRequest request) {
        return ApiResponse.<List<ClientResponse>>builder()
                .result(clientService.getClientsByDateRange(request))
                .build();
    }

}
