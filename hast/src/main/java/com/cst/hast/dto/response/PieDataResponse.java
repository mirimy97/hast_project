package com.cst.hast.dto.response;

import com.cst.hast.dto.Article;
import com.cst.hast.dto.ChartData;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PieDataResponse {

    private String name_en;
    private String name_ko;
    private Integer value;

}
