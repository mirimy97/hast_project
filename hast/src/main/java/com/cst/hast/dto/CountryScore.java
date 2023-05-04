package com.cst.hast.dto;

import com.cst.hast.entity.ExportEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CountryScore {

    private String countryCode;
    private double score;
    private Long count;

    public static CountryScore fromEntity(ExportEntity entity) {
        return new CountryScore (
                entity.getExportCountryCode(),
                entity.getExportScore() / (double) entity.getExportRowCount(),
                entity.getExportRowCount()
        );
    }

}
