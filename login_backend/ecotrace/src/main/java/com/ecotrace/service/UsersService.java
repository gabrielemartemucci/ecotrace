package com.ecotrace.service;

import com.ecotrace.model.UsersModel;
import com.ecotrace.repository.UsersRepository;
import com.ecotrace.model.PersonalVehicleModel;
import com.ecotrace.repository.PersonalVehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UsersService {

    private final UsersRepository usersRepository;
    @Autowired
    private final PersonalVehicleRepository personalVehicleRepository;

    public UsersService(UsersRepository usersRepository, PersonalVehicleRepository personalVehicleRepository) {
        this.usersRepository = usersRepository;
        this.personalVehicleRepository = personalVehicleRepository;
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

    public Map<String, Object> getUserAndVehicles(Integer id) {
        Optional<UsersModel> user = usersRepository.findById(id);
        if (user.isPresent()) {
            List<PersonalVehicleModel> vehicles = personalVehicleRepository.findByUserId((long) user.get().getId());

            // Creazione della mappa dei risultati
            Map<String, Object> result = new HashMap<>();
            result.put("user", user.get());
            result.put("vehicles", vehicles);

            return result;
        } else {
            throw new RuntimeException("Utente non trovato");
        }
    }
}
