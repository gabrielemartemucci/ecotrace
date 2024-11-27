package com.ecotrace.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "personal_vehicles")
public class PersonalVehicleModel {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private float co2Emission;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UsersModel user;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public float getCo2Emission() {
        return co2Emission;
    }

    public UsersModel getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setCo2Emission(float co2Emission) {
        this.co2Emission = co2Emission;
    }

    public void setUser(UsersModel user) {
        this.user = user;
    }
}
