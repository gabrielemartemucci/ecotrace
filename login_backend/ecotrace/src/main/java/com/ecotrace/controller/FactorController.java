package com.ecotrace.controller;

import com.ecotrace.model.FactorModel;
import com.ecotrace.service.FactorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/factors")
public class FactorController {

    @Autowired
    private FactorService factorService;

    @GetMapping("/{type}")
    public ResponseEntity<List<FactorModel>> getFactors(@PathVariable String type) {
        List<FactorModel> items = factorService.getFactorsByType(type);
        return ResponseEntity.ok(items);
    }
}