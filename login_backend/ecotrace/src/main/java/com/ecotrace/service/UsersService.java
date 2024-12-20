package com.ecotrace.service;

import com.ecotrace.dto.EmissionDay;
import com.ecotrace.model.UsersModel;
import com.ecotrace.repository.CO2EmissionRepository;
import com.ecotrace.repository.UsersRepository;
import com.ecotrace.model.PersonalVehicleModel;
import com.ecotrace.repository.PersonalVehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.sql.Date;

@Service
public class UsersService {

    private final UsersRepository usersRepository;
    @Autowired
    private final PersonalVehicleRepository personalVehicleRepository;
    @Autowired
    private final CO2EmissionRepository co2EmissionRepository;

    public UsersService(UsersRepository usersRepository, PersonalVehicleRepository personalVehicleRepository, CO2EmissionRepository co2EmissionRepository) {
        this.usersRepository = usersRepository;
        this.personalVehicleRepository = personalVehicleRepository;
        this.co2EmissionRepository = co2EmissionRepository;
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

            Map<String, Object> result = new HashMap<>();
            result.put("user", user.get());
            result.put("vehicles", vehicles);

            return result;
        } else {
            throw new RuntimeException("Utente non trovato");
        }
    }

    public List<Map<String, Object>> getWeeklyCo2Emission(Long user_id) {
        return co2EmissionRepository.aggregateCo2ByWeek(user_id);
    }

    public List<Map<String, Object>> getMonthlyCo2Emission(Long user_id) {
        return co2EmissionRepository.aggregateCo2ByMonth(user_id);
    }

    public List<Map<String, Object>> getDailyCo2EmissionLast7Days(Long user_id) {
        return co2EmissionRepository.aggregateCo2ByDayLast7Days(user_id);
    }

    public List<Map<String, Object>> getDailyCo2EmissionLast30Days(Long user_id) {
        return co2EmissionRepository.aggregateCo2ByDayLast30Days(user_id);
    }

    public Float getCo2Today(Long user_id) {
        return co2EmissionRepository.aggregateCo2Today(user_id);
    }

    public EmissionDay getCo2MaxDay(Long user_id) {
        Object[] result = co2EmissionRepository.aggregateMaxCo2Day(user_id);
        Object[] innerResult = null;

        if (result != null && result.length > 0) {
            innerResult = (Object[]) result[0];
        }
            if (innerResult != null && innerResult.length == 2) {
                Date date = (java.sql.Date) innerResult[0];
                Float emission = ((Number) innerResult[1]).floatValue();
                System.out.println("Data: " + date + ", Emissione: " + emission);
                return new EmissionDay(date, emission);
            } else {
                System.out.println("Formato del risultato non corretto.");
                return new EmissionDay(null, 0.0f);
            }
    }

    public EmissionDay getCo2MinDay(Long user_id) {
        Object[] result = co2EmissionRepository.aggregateMinCo2Day(user_id);
        Object[] innerResult = null;

        if (result != null && result.length > 0) {
            innerResult = (Object[]) result[0];
        }
        if (innerResult != null && innerResult.length == 2) {
            Date date = (java.sql.Date) innerResult[0];
            Float emission = ((Number) innerResult[1]).floatValue();
            System.out.println("Data: " + date + ", Emissione: " + emission);
            return new EmissionDay(date, emission);
        } else {
            System.out.println("Formato del risultato non corretto.");
            return new EmissionDay(null, 0.0f);
        }
    }
}
