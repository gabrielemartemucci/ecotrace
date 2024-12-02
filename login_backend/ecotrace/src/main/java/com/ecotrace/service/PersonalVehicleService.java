package com.ecotrace.service;
import com.ecotrace.model.PersonalVehicleModel;
import org.springframework.stereotype.Service;
import com.ecotrace.repository.PersonalVehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class PersonalVehicleService {
    private final PersonalVehicleRepository vehicleRepository;
    public PersonalVehicleService(PersonalVehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    public PersonalVehicleModel addVehicle(PersonalVehicleModel vehicle)
    {
        return vehicleRepository.save(vehicle);
    }
}
