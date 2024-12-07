package com.ecotrace.service;

import com.ecotrace.model.SuggestionModel;
import com.ecotrace.repository.SuggestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuggestionService {
    @Autowired
    private SuggestionRepository suggestionRepository;

    public List<SuggestionModel> getSuggestions() {
        return suggestionRepository.findAll();
    }
}