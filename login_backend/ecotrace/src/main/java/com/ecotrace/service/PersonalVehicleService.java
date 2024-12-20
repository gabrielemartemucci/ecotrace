package com.ecotrace.service;
import com.ecotrace.model.PersonalVehicleModel;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import com.ecotrace.repository.PersonalVehicleRepository;

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

    public void deleteVehicleById(Long id) {
        if (!vehicleRepository.existsById(id)) {
            throw new EntityNotFoundException("Veicolo con ID" + id + "non trovato");
        }
        vehicleRepository.deleteById(id);
    }
}
