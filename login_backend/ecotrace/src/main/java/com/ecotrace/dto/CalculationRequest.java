package com.ecotrace.dto;

import java.util.List;

public class CalculationRequest {
    private List<PersonalVehicle> personalVehicles;
    private List<Transport> transports;
    private List<Food> food;
    private Float energy;

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

    public List<Food> getFood() {
        return food;
    }

    public void setFood(List<Food> food) {
        this.food = food;
    }

    public Float getEnergy() {
        return energy;
    }

    public void setEnergy(Float energy) {
        this.energy = energy;
    }

    public static class PersonalVehicle {
        private Long vehicleId;
        private Float kilometers;

        public Long getVehicleId() {
            return vehicleId;
        }

        public void setVehicleId(Long vehicleId) {
            this.vehicleId = vehicleId;
        }

        public Float getKilometers() {
            return kilometers;
        }

        public void setKilometers(Float kilometers) {
            this.kilometers = kilometers;
        }
    }

    public static class Transport {
        private Long transportId;
        private Float kilometers;

        public Long getTransportId() {
            return transportId;
        }

        public void setTransportId(Long transportId) {
            this.transportId = transportId;
        }

        public Float getKilometers() {
            return kilometers;
        }

        public void setKilometers(Float kilometers) {
            this.kilometers = kilometers;
        }
    }

    public static class Food {
        private Long foodId;
        private Float quantity;

        public Long getFoodId() {
            return foodId;
        }

        public void setFoodId(Long foodId) {
            this.foodId = foodId;
        }

        public Float getQuantity() {
            return quantity;
        }

        public void setQuantity(Float quantity) {
            this.quantity = quantity;
        }
    }
}