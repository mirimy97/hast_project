package com.cst.hast.service;

import com.cst.hast.dto.*;
import com.cst.hast.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MainService {

    private final DslRepository dslRepository;

    private final PointRepository pointRepository;


    public List<Country> getCountryByScore() {

        return dslRepository.findCountryByScore();
    }

    // 국가 기사 최신순 500개
    public List<Article> getCountryArticles(String code) {
        return pointRepository.findUpdatedArticles(code).stream().map(Article::fromEntity).collect(Collectors.toList());
    }

    // 받은 위도, 겯도 기사
    public List<Article> getLatLongArticles(double lat, double lon) {
        return pointRepository.findByLocation(lat, lon).stream().map(Article::fromEntity).collect(Collectors.toList());
    }

    // 치안 수치 (시각화)
    public List<ChartData> getChartData(String code) {
        return dslRepository.findByCode(code);
    }

    // 2d map 세계 점 찍기
    public Collection<Dots> getWorldDots() {
        return dslRepository.findWorldDots().stream().map(Dots::fromEntity).collect(Collectors.toList());
    }

    public Collection<CountryScore> getCountryScore() {
        return dslRepository.findCountryScore().stream().map(CountryScore::fromEntity).collect(Collectors.toList());
    }

    // 2d map 국가 점 찍기
    public Collection<Dots> getCountryDots(String code) {
        return dslRepository.findCountryDots(code).stream().map(Dots::fromEntity).collect(Collectors.toList());
    }
}
