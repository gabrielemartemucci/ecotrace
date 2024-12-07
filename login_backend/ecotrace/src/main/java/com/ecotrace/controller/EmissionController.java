package com.ecotrace.controller;

import com.ecotrace.model.SuggestionModel;
import com.ecotrace.service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecotrace.service.EmissionService;
import com.ecotrace.dto.CalculationRequest;
import com.ecotrace.dto.CalculationResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/emissions")
public class EmissionController {

    @Autowired
    private EmissionService emissionService;
    @Autowired
    private SuggestionService suggestionService;

    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculateEmissions(@RequestBody CalculationRequest request) {
        CalculationResponse calc = emissionService.calculateEmissions(request);
        List<SuggestionModel> suggestions = suggestionService.getSuggestions();
        Map<String, Object> response = new HashMap<>();
        response.put("response", calc);
        response.put("suggestions", suggestions);
        return ResponseEntity.ok(response);
    }
}
