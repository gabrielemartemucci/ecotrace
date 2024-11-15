package com.ecotrace.repository;

import com.ecotrace.model.UsersModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<UsersModel, Integer> {

    Optional<UsersModel> findByEmailAndPassword(String email, String password);

    Optional<UsersModel> findByEmail(String email);
}
