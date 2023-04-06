package com.cst.hast.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PointArticle {

    private Long pointId;
    private String pointKorComment;
    private String pointEngComment;
    private String pointUrl;
    private String pointImage;
    private Integer pointCategory;
    private double pointScore;
    private String pointDatetime;

    public PointArticle(Long pointId, String pointKorComment, String pointEngComment, String pointUrl, String pointImage, Integer pointCategory, Double pointScore, LocalDateTime pointDatetime) {
        this.pointId = pointId;
        this.pointKorComment = pointKorComment;
        this.pointEngComment = pointEngComment;
        this.pointUrl = pointUrl;
        this.pointImage = pointImage;
        this.pointCategory = pointCategory;
        this.pointScore = pointScore;
        this.pointDatetime = pointDatetime.toString();
    }

}
