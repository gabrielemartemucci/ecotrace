package com.ecotrace.service;

import com.ecotrace.dto.CalculationRequest;
import com.ecotrace.dto.CalculationResponse;
import com.ecotrace.model.CO2EmissionModel;
import com.ecotrace.model.FactorModel;
import com.ecotrace.model.PersonalVehicleModel;
import com.ecotrace.model.UsersModel;
import com.ecotrace.repository.CO2EmissionRepository;
import com.ecotrace.repository.FactorRepository;
import com.ecotrace.repository.PersonalVehicleRepository;
import com.ecotrace.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class EmissionService {

    @Autowired
    private FactorRepository factorRepository;

    @Autowired
    private PersonalVehicleRepository personalVehicleRepository;

    @Autowired
    private CO2EmissionRepository CO2EmissionRepository;

    @Autowired
    private UsersRepository userRepository;


    public CalculationResponse calculateEmissions(CalculationRequest request, Integer id) {
        float totalEmissions = 0;
        try {
        for (CalculationRequest.PersonalVehicle vehicle : request.getPersonalVehicles()) {
            PersonalVehicleModel personalVehicle = personalVehicleRepository.findById(vehicle.getVehicleId())
                    .orElseThrow(() -> new RuntimeException("Vehicle not found"));
            totalEmissions += vehicle.getKilometers() * personalVehicle.getCo2_emission();
        }

        for (CalculationRequest.Transport transport : request.getTransports()) {
            FactorModel factor = factorRepository.findById(transport.getTransportId())
                    .orElseThrow(() -> new RuntimeException("Transport not found"));
            totalEmissions += transport.getKilometers() * factor.getCo2_emission();
        }

        for (CalculationRequest.Food food : request.getFood()) {
            FactorModel factor = factorRepository.findById(food.getFoodId())
                    .orElseThrow(() -> new RuntimeException("Food not found"));
            totalEmissions += food.getQuantity() * factor.getCo2_emission();
        }

        if (request.getEnergy() != null) {
            FactorModel energyFactor = factorRepository.findByType("energia").get(0);
            totalEmissions += request.getEnergy() * energyFactor.getCo2_emission();
        }

        UsersModel user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Utente non trovato"));
        CO2EmissionModel emission = new CO2EmissionModel();
        emission.setUser(user);
        emission.setDate(LocalDate.now());
        emission.setTime(LocalTime.now());
        emission.setCo2_emission(totalEmissions);
        CO2EmissionRepository.save(emission);

        return new CalculationResponse(totalEmissions);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Errore nel calcolo delle emissioni: " + e.getMessage(), e);
        }
    }

}