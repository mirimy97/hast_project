package com.cst.hast.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Country {

    private String countryCode;
    private double exportScore;
    private Long exportRowCount;

}
