package com.cst.hast.dto.response;

import com.cst.hast.dto.Article;
import com.cst.hast.dto.Dots;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DotsResponse {

    private double latitude;
    private double longitude;
    private double score;
    private Long count;

    public static DotsResponse fromDots(Dots dots) {
        return new DotsResponse(
                dots.getLatitude(),
                dots.getLongitude(),
                dots.getScore(),
                dots.getCount()
        );
    }


}
