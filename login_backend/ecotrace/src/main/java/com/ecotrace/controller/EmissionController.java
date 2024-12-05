package com.ecotrace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecotrace.service.EmissionService;
import com.ecotrace.dto.CalculationRequest;
import com.ecotrace.dto.CalculationResponse;

@RestController
@RequestMapping("/api/emissions")
public class EmissionController {

    @Autowired
    private EmissionService emissionService;

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculateEmissions(@RequestBody CalculationRequest request) {
        CalculationResponse response = emissionService.calculateEmissions(request);
        return ResponseEntity.ok(response);
    }
}
