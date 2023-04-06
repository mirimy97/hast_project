package com.cst.hast.dto;

import com.cst.hast.entity.ExportEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Dots {

    private Long count;
    private double score;
    private double latitude;
    private double longitude;


    public static Dots fromEntity(ExportEntity entity) {
        return new Dots (
                entity.getExportRowCount(),
                entity.getExportScore() / (double) entity.getExportRowCount(),
                entity.getExportLat(),
                entity.getExportLong()
        );
    }

}
