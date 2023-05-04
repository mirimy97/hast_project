//package com.cst.hast.service;
//
//import com.cst.hast.repository.ArticleRepository;
//import com.cst.hast.repository.StatisticsRepository;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//
//import java.util.Collections;
//
//import static org.mockito.Mockito.when;
//
//@SpringBootTest
//public class MainServiceTest {
//
//    @Autowired
//    MainService mainService;
//
//    @MockBean
//    ArticleRepository articleRepository;
//    @MockBean
//    StatisticsRepository statisticsRepository;
//
//    @Test
//    void 최신_기사_목록_요청_성공() {
//        when(articleRepository.findAll()).thenReturn(Collections.emptyList());
//        Assertions.assertDoesNotThrow(() -> mainService.getUpdateArticles());
//    }
//
//    @Test
//    void 국가_기사_목록_요청_성공() {
//        when(articleRepository.findAllByArticleCountryCodeOrderByArticleDateTime("KO")).thenReturn(Collections.emptyList());
//        Assertions.assertDoesNotThrow(() -> mainService.getCountryArticles("KO"));
//    }
//
//    @Test
//    void 지역_기사_목록_요청_성공() {
//        when(articleRepository.findAllByArticleLatAndArticleLongOrderByArticleDateTime(-20.0F, 20.3F)).thenReturn(Collections.emptyList());
//        Assertions.assertDoesNotThrow(() -> mainService.getCityArticles(-20.0F, 20.3F));
//    }
//
//    @Test
//    void 월별_수치_목록_요청_성공() {
//        when(statisticsRepository.findAllByStatisticsCountryCodeOrderByStatisticsMonthAsc("KO")).thenReturn(Collections.emptyList());
//        Assertions.assertDoesNotThrow(() -> mainService.getCityArticles(-20.0F, 20.3F));
//    }
//
//}
