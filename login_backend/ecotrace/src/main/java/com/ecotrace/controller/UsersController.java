package com.ecotrace.controller;

import com.ecotrace.model.UsersModel;
import com.ecotrace.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@Controller
@RequestMapping("/api/auth")
public class UsersController {

    //@Autowired
    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/register")
    public String getRegisterPage(Model model) {
        model.addAttribute("registerRequest", UsersModel.createUsersModel());
        return "/register";
    }

    @GetMapping("/login")
    public String getLoginPage(Model model) {
        model.addAttribute("loginRequest", UsersModel.createUsersModel());
        return "/login";
    }

    /*@PostMapping("/register")
    public String register(@ModelAttribute UsersModel usersModel) {
        System.out.println("register request: " + usersModel);
        UsersModel registeredUser = usersService.registerUser(usersModel.getName(),usersModel.getSurname(),usersModel.getEmail(),usersModel.getPassword());
        return registeredUser == null ? "/error" : "redirect:/login";
    }*/

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody UsersModel usersModel) {
        System.out.println("register request: " + usersModel);
        UsersModel registeredUser = usersService.registerUser(usersModel.getName(), usersModel.getSurname(), usersModel.getEmail(), usersModel.getPassword());

        if (registeredUser == null) {
            return ResponseEntity.status(400).body(Map.of("message", "Errore nella registrazione: email già in uso o dati invalidi."));
        }
        return ResponseEntity.status(201).body(Map.of("message", "Registrazione riuscita"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsersModel usersModel, Model model) {
        System.out.println("login request: " + usersModel);
        UsersModel authenticated = usersService.authenticate(usersModel.getEmail(),usersModel.getPassword());
        if (authenticated != null) {
            model.addAttribute("userLogin", authenticated.getEmail());
            Map<String, Object> userData = usersService.getUserAndVehicles(authenticated.getId());
            return ResponseEntity.ok(userData);
        }else{
            return ResponseEntity.status(400).body(Map.of("message", "Credenziali non valide"));
        }
    }
}
