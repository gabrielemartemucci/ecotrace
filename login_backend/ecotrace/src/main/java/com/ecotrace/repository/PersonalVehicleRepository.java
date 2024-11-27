package com.ecotrace.repository;

import com.ecotrace.model.PersonalVehicleModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface PersonalVehicleRepository extends JpaRepository<PersonalVehicleModel, Long> {
    List<PersonalVehicleModel> findByUserId(Long userId);
}

