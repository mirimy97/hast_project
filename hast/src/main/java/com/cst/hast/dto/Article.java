package com.cst.hast.dto;

import com.cst.hast.entity.ExportEntity;
import com.cst.hast.entity.PointEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Article {

    private Long id;
    private String CountryCode;
    private String korKeyword;
    private String engKeyword;
    private String url;
    private String imgUrl;

    private Integer category;
    private double score;
    private String timeStamp;



    public static Article fromEntity(PointEntity entity) {
        return new Article (
                entity.getPointEventId(),
                entity.getPointCountryCode(),
                entity.getPointKorComment(),
                entity.getPointEngComment(),
                entity.getPointUrl(),
                entity.getPointImage(),
                entity.getPointCategory(),
                entity.getPointScore(),
                entity.getPointDatetime().plusHours(9L).toString()
        );
    }

}
