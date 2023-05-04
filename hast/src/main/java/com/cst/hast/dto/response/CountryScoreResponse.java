package com.cst.hast.dto.response;

import com.cst.hast.dto.Article;
import com.cst.hast.dto.CountryScore;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CountryScoreResponse {

    private String countryCode;
    private double score;
    private Long count;

    public static CountryScoreResponse fromCountryScore(CountryScore countryScore) {
        return new CountryScoreResponse(
                countryScore.getCountryCode(),
                countryScore.getScore(),
                countryScore.getCount()
        );
    }

}
