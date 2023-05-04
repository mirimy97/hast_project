package com.cst.hast.dto.response;

import com.cst.hast.dto.Article;
import com.cst.hast.dto.Country;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CountryResponse {


    private String countryCode;


    public static CountryResponse fromCountry(Country country) {
        return new CountryResponse(
                country.getCountryCode()
        );
    }

}
