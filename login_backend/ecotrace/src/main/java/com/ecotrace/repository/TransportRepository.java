package com.ecotrace.repository;

import com.ecotrace.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransportRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByType(String type);  // Recupera gli oggetti di tipo "transport"
}
