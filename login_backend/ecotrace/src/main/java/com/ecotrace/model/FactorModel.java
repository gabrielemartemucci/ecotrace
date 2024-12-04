package com.ecotrace.model;

import jakarta.persistence.*;

@Entity
@Table(name = "factors")
public class FactorModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String factor;
    private String type;
    private float co2_emission;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFactor() {
        return factor;
    }

    public void setFactor(String factor) {
        this.factor = factor;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getCo2_emission() {
        return co2_emission;
    }

    public void setCo2_emission(float co2_emission) {
        this.co2_emission = co2_emission;
    }
}
