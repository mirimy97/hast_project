package com.cst.hast.controller;


import com.cst.hast.common.Response;
import com.cst.hast.dto.ChartData;
import com.cst.hast.dto.Country;
import com.cst.hast.dto.response.*;
import com.cst.hast.exception.HastApplicationException;
import com.cst.hast.service.MainService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MainController {

    private final MainService mainService;

    // 위험도순 국가 순위
    @ApiOperation(value="위험도순 국가 순위 (10개)", notes="정상 동작 시 'result' return")
    @ApiResponses({
            @ApiResponse(code = 200, message = "API 정상 작동"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping(value = "/articles")
    public Response<List<CountryResponse>> getCountryByScore() {
        log.info("get country by score - main page");
        return Response.of(mainService.getCountryByScore().stream().map(CountryResponse::fromCountry).collect(Collectors.toList()));
    }

    // 2d map 세계 점 찍기
    @ApiOperation(value="2d map 세계 점 찍기", notes="정상 동작 시 'result' return")
    @ApiResponses({
            @ApiResponse(code = 200, message = "API 정상 작동"),
            @ApiResponse(code = 500, message = "서버 에러")
    })

    @GetMapping("/info/dots")
    public Response<List<DotsResponse>> getWorldDots() {
        log.info("get world dots info");
        return Response.of(mainService.getWorldDots().stream().map(DotsResponse::fromDots).collect(Collectors.toList()));
    }

    // 2d map 국가 점 찍기
    @ApiOperation(value="2d map 세계 점 찍기", notes="정상 동작 시 'result' return")
    @ApiResponses({
            @ApiResponse(code = 200, message = "API 정상 작동"),
            @ApiResponse(code = 500, message = "서버 에러")
    })

    @GetMapping("/info/dots/{code}")
    public Response<List<DotsResponse>> getCountryDots(@PathVariable("code") String code) {
        log.info("get country dots info");
        return Response.of(mainService.getCountryDots(code).stream().map(DotsResponse::fromDots).collect(Collectors.toList()));
    }

    // 최신순 기사 500개
    @ApiOperation(value="국가 최신순 기사 500개 조회", notes="정상 동작 시 'result' return")
    @ApiResponses({
            @ApiResponse(code = 200, message = "API 정상 작동"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/articles/{code}")
    public Response<List<CountryArticleResponse>> getCountryArticles(@PathVariable String code) {
        log.info("get country articles");
        return Response.of(mainService.getCountryArticles(code).stream().map(CountryArticleResponse::fromArticle).collect(Collectors.toList()));
    }


    // 받은 위도, 경도 기사 500개 조회
    @ApiOperation(value="받은 위도, 경도 0.3 반경내 정사각형 범위 기사 500개 조회", notes="정상 동작 시 'result' return")
    @ApiResponses({
            @ApiResponse(code = 200, message = "API 정상 작동"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/articles/{lat}/{lon}")
    public Response<List<LatLongResponse>> getLatLongArticles(@PathVariable String lat, @PathVariable String lon) {
        log.info("get lat, long articles");

        try {
            Double doubletLat = Double.parseDouble(lat);
            Double doubleLon = Double.parseDouble(lon);

            return Response.of(mainService.getLatLongArticles(doubletLat, doubleLon).stream().map(LatLongResponse::fromArticle).collect(Collectors.toList()));
        } catch (NumberFormatException e) { // 잘못된 형식의 데이터
            throw new HastApplicationException();
        }
    }

    // 국가별 점수
    @ApiOperation(value="국가별 점수 조회", notes="정상 동작 시 'result' return")
    @ApiResponses({
            @ApiResponse(code = 200, message = "API 정상 작동"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/scores")
    public Response<List<CountryScoreResponse>> getCountryScore() {
        log.info("get scores");
        return Response.of(mainService.getCountryScore().stream().map(CountryScoreResponse::fromCountryScore).collect(Collectors.toList()));
    }

    // 차트 데이터
    @ApiOperation(value="차트 데이터 조회", notes="정상 동작 시 'result' return")
    @ApiResponses({
            @ApiResponse(code = 200, message = "API 정상 작동"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/charts/{code}")
    public Response<List<ChartDataResponse>> getChartData(@PathVariable String code) {
        log.info("get chart data");
        return Response.of(mainService.getChartData(code).stream().map(ChartDataResponse::fromChartData).collect(Collectors.toList()));
    }


}

// 1. 치안 점수 조회 (시각화)
// 2. 동그라미 그리는 점수 조회