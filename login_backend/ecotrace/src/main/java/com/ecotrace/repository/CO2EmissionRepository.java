package com.ecotrace.repository;

import com.ecotrace.model.CO2EmissionModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CO2EmissionRepository extends JpaRepository<CO2EmissionModel, Long> {
}