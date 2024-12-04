package com.ecotrace.service;

import com.ecotrace.model.FactorModel;
import com.ecotrace.repository.FactorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FactorService {
    @Autowired
    private FactorRepository factorRepository;

    public List<FactorModel> getFactorsByType(String type) {
        return factorRepository.findByType(type);
    }
}