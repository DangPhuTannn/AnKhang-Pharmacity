package com.example.demo.service;

import java.util.HashSet;
import java.util.List;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.request.DateRangeRequest;
import com.example.demo.dto.request.user.UserCreationRequest;
import com.example.demo.dto.request.user.UserUpdateRequest;
import com.example.demo.dto.response.client.ClientResponse;
import com.example.demo.entity.Client;
import com.example.demo.entity.User;
import com.example.demo.enums.RankClient;
import com.example.demo.enums.Role;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.mapper.ClientMapper;
import com.example.demo.repository.ClientRepository;
import com.example.demo.specifications.ClientSpecifications;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ClientService {
    ClientRepository clientRepository;
    ClientMapper clientMapper;
    PasswordEncoder passwordEncoder;
    Logger log = LoggerFactory.getLogger(CartService.class);

    public void createClient(UserCreationRequest request, User user) {
        Client client = clientMapper.toClient(request);
        Set<String> roles = new HashSet<>();
        roles.add(Role.CLIENT.name());
        client.setRoles(roles);
        client.setUser(user);
        client.setRankClient(RankClient.NONE);
        clientRepository.save(client);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<ClientResponse> getClients() {
        // var authentication = SecurityContextHolder.getContext();
        // log.info(authentication.getAuthentication().getAuthorities().toString());
        List<Client> listClients = clientRepository.findAll();
        return listClients.stream().map(eachClient -> clientMapper.toClientResponse(eachClient)).toList();
    }

    @PreAuthorize("#email == authentication.name")
    public ClientResponse getMyInfor(String email) {
        Client client = getClientFromEmail(email);
        return clientMapper.toClientResponse(client);
    }

    @PreAuthorize("hasRole('ADMIN') or #email == authentication.name")
    public ClientResponse getClientByEmail(String email) {
        Client client = getClientFromEmail(email);
        return clientMapper.toClientResponse(client);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public ClientResponse getClient(int id) {
        return clientMapper.toClientResponse(
                clientRepository.findById(id).orElseThrow(() -> new RuntimeException("Client not found")));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<ClientResponse> getClientsByDateRange(DateRangeRequest request) {
        Specification<Client> spec = Specification.where(ClientSpecifications
                .hasStartDateBetween(request.getStartDate(), request.getEndDate()));
        return clientRepository.findAll(spec).stream().map(eachClient -> clientMapper.toClientResponse(eachClient))
                .toList();
    }

    @PreAuthorize("hasRole('ADMIN') or #email == authentication.name")
    public Client updateClient(String email, UserUpdateRequest request) {
        Client client = getClientFromEmail(email);
        String currentPasswordFromRequest = request.getCurrentPassword();
        var authentication = SecurityContextHolder.getContext();
        var authorizes = authentication.getAuthentication().getAuthorities();
        if (authorizes.stream().anyMatch(eachRole -> eachRole.getAuthority().equals("ROLE_ADMIN"))) {
            if (request.getNewPassword().length() > 0) {
                request.setNewPassword(passwordEncoder.encode(request.getNewPassword()));
                clientMapper.updateClient(client, request);
            } else {
                clientMapper.updateClientWithOutPassword(client, request);
            }
        } else {
            if (currentPasswordFromRequest.length() > 0) {
                String currentPasswordFromClient = client.getPassword();
                boolean isMatch = passwordEncoder.matches(currentPasswordFromRequest, currentPasswordFromClient);

                if (isMatch) {
                    request.setNewPassword(passwordEncoder.encode(request.getNewPassword()));
                    clientMapper.updateClient(client, request);
                } else {
                    throw new AppException(ErrorCode.WRONG_PASSWORD);
                }
            } else {
                clientMapper.updateClientWithOutPassword(client, request);
            }
        }

        return clientRepository.save(client);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public ClientResponse deleteClient(String email) {
        Client client = getClientFromEmail(email);
        client.setDeleted(true);
        return clientMapper.toClientResponse(clientRepository.save(client));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public ClientResponse restoreClient(String email) {
        Client client = getClientFromEmail(email);
        client.setDeleted(false);
        return clientMapper.toClientResponse(clientRepository.save(client));
    }

    private Client getClientFromEmail(String email) {
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
        return client;
    }
}
