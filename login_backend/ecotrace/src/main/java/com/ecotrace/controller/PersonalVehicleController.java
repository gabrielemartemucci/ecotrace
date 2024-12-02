package com.ecotrace.controller;

import com.ecotrace.model.PersonalVehicleModel;
import com.ecotrace.model.UsersModel;
import com.ecotrace.service.PersonalVehicleService;
import com.ecotrace.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/vehicles")
public class PersonalVehicleController {
    @Autowired
    private PersonalVehicleService vehicleService;
    @Autowired
    private UsersService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addVehicle(@RequestBody PersonalVehicleModel vehicle, @RequestParam String email) {
        System.out.println("Email ricevuta nella richiesta: " + email); // Log dell'email ricevuta
        try {
            Map<String, Object> userAndVehicles = userService.getUserAndVehicles(email);
            UsersModel user = (UsersModel) ((Map<?, ?>) userAndVehicles).get("user");
            vehicle.setUser(user);
            PersonalVehicleModel savedVehicle = vehicleService.addVehicle(vehicle);
            return ResponseEntity.status(201).body(savedVehicle);
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body("Utente non trovato");
        }
    }
}