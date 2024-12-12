package com.ecotrace.repository;

import com.ecotrace.model.FactorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransportRepository extends JpaRepository<FactorModel, Long> {
    List<FactorModel> findAllByType(String type);
}
