package com.cst.hast.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class ChartData {

    private String name;
    private float country_tone;
    private float world_tone;
    private Integer bar;
    private Integer crime;
    private Integer accident;
    private Integer disease;
    private Integer disaster;
    private Integer politic;

    private Integer etc;

    public ChartData(String name, float country_tone, double world_tone, Integer bar, Integer crime, Integer accident, Integer disease, Integer disaster, Integer politic, Integer etc) {
        this.name = name;
        this.country_tone = country_tone;
        this.world_tone = (float) world_tone;
        this.bar = bar;
        this.crime = crime;
        this.accident = accident;
        this.disease = disease;
        this.disaster = disaster;
        this.politic = politic;
        this.etc = etc;
    }
}
