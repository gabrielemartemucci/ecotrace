package com.ecotrace.controller;

import com.ecotrace.model.UsersModel;
import com.ecotrace.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UsersController {

    //@Autowired
    //private UsersService usersService;
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

    @PostMapping("/register")
    public String register(@ModelAttribute UsersModel usersModel) {
        System.out.println("register request: " + usersModel);
        UsersModel registeredUser = usersService.registerUser(usersModel.getName(),usersModel.getSurname(),usersModel.getEmail(),usersModel.getPassword());
        return registeredUser == null ? "/error" : "redirect:/login";
    }

    @PostMapping("/login")
    public String login(@ModelAttribute UsersModel usersModel, Model model) {
        System.out.println("login request: " + usersModel);
        UsersModel authenticated = usersService.authenticate(usersModel.getEmail(),usersModel.getPassword());
        if (authenticated != null) {
            model.addAttribute("userLogin", authenticated.getEmail());
            return "/personal";
        }else{
            return "/error";
        }
    }
}
