package com.cst.hast.dto.response;

import com.cst.hast.dto.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LatLongResponse {

    private Long id;
    private String korKeyword;
    private String engKeyword;
    private String url;
    private String imgUrl;
    private Integer category;
    private double score;
    private String timeStamp;

    public static LatLongResponse fromArticle(Article article) {
        return new LatLongResponse(
                article.getId(),
                article.getKorKeyword(),
                article.getEngKeyword(),
                article.getUrl(),
                article.getImgUrl(),
                article.getCategory(),
                article.getScore(),
                article.getTimeStamp()
        );
    }

}
