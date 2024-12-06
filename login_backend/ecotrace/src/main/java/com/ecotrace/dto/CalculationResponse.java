package com.ecotrace.dto;

public class CalculationResponse {
    private Float totalEmissions;

    public CalculationResponse(Float totalEmissions) {
        this.totalEmissions = totalEmissions;
    }

    public Float getTotalEmissions() {
        return totalEmissions;
    }

    public void setTotalEmissions(Float totalEmissions) {
        this.totalEmissions = totalEmissions;
    }
}