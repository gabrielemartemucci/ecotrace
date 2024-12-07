package com.ecotrace.model;

import java.util.List;

public class CO2Request {
    private List<PersonalVehicle> personalVehicles;
    private List<Transport> transports;
    private Double energy;
    private List<Food> food;

    public List<PersonalVehicle> getPersonalVehicles() {
        return personalVehicles;
    }

    public void setPersonalVehicles(List<PersonalVehicle> personalVehicles) {
        this.personalVehicles = personalVehicles;
    }

    public List<Transport> getTransports() {
        return transports;
    }

    public void setTransports(List<Transport> transports) {
        this.transports = transports;
    }

    public Double getEnergy() {
        return energy;
    }

    public void setEnergy(Double energy) {
        this.energy = energy;
    }

    public List<Food> getFood() {
        return food;
    }

    public void setFood(List<Food> food) {
        this.food = food;
    }

    public static class PersonalVehicle {
        private Long selectedVehicleId;
        private Double kilometers;

        public Long getSelectedVehicleId() {
            return selectedVehicleId;
        }

        public void setSelectedVehicleId(Long selectedVehicleId) {
            this.selectedVehicleId = selectedVehicleId;
        }

        public Double getKilometers() {
            return kilometers;
        }

        public void setKilometers(Double kilometers) {
            this.kilometers = kilometers;
        }
    }

    public static class Transport {
        private Long selectedTransportId;
        private Double kilometers;

        public Long getSelectedTransportId() {
            return selectedTransportId;
        }

        public void setSelectedTransportId(Long selectedTransportId) {
            this.selectedTransportId = selectedTransportId;
        }

        public Double getKilometers() {
            return kilometers;
        }

        public void setKilometers(Double kilometers) {
            this.kilometers = kilometers;
        }
    }

    public static class Food {
        private Long selectedFoodId;
        private Double quantity;

        public Long getSelectedFoodId() {
            return selectedFoodId;
        }

        public void setSelectedFoodId(Long selectedFoodId) {
            this.selectedFoodId = selectedFoodId;
        }

        public Double getQuantity() {
            return quantity;
        }

        public void setQuantity(Double quantity) {
            this.quantity = quantity;
        }
    }
}
