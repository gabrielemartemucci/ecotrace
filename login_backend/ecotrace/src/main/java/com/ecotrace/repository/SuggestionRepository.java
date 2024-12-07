package com.ecotrace.repository;

import com.ecotrace.model.SuggestionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SuggestionRepository extends JpaRepository<SuggestionModel, Long> {
}
