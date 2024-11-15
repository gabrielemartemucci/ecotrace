package com.ecotrace.service;

import com.ecotrace.model.UsersModel;
import com.ecotrace.repository.UsersRepository;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public UsersModel registerUser(String name, String surname, String email, String password) {
        if (email == null || password == null) {
            return null;
        } else {
            if(usersRepository.findByEmail(email).isPresent()) {
                System.out.println("Duplicate login");
                return null;
            }
            UsersModel usersModel = UsersModel.createUsersModel();
            usersModel.setEmail(email);
            usersModel.setPassword(password);
            usersModel.setName(name);
            usersModel.setSurname(surname);
            return usersRepository.save(usersModel);
        }
    }

    public UsersModel authenticate(String email, String password) {
        return usersRepository.findByEmailAndPassword(email, password).orElse(null);
    }
}
