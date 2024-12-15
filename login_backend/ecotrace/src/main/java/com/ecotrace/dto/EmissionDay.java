package com.ecotrace.dto;

import java.sql.Date;

public class EmissionDay {
    private Date datem;
    private Float emission;

    public EmissionDay(Date date, Float emission) {
        this.datem = date;
        this.emission = emission;
    }

    // Getter e Setter
    public Date getDate() {
        return datem;
    }

    public void setDate(Date date) {
        this.datem = date;
    }

    public Float getEmission() {
        return emission;
    }

    public void setEmission(Float emission) {
        this.emission = emission;
    }
}
