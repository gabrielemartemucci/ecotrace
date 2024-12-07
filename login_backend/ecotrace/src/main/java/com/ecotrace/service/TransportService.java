package com.ecotrace.service;

import com.ecotrace.model.Item;
import com.ecotrace.repository.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransportService {
    @Autowired
    private TransportRepository transportRepository;

    public List<Item> getAllTransports() {
        return transportRepository.findAll();
    }
}