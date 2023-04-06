//package com.cst.hast.controller;
//
//import com.cst.hast.dto.Article;
//import com.cst.hast.dto.Statics;
//import com.cst.hast.service.MainService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//
//
//@SpringBootTest
//@AutoConfigureMockMvc
//class MainControllerTest {
//    @Autowired
//    MockMvc mockMvc;
//    @MockBean
//    MainService mainService;
//
//    @Test
//    void 최신_기사_목록() throws Exception {
//        List<Article> articles = new ArrayList<>();
//        articles.add(new Article("Headline 1", "Url 1", "Img 1", 1, 1.9, "2023-03-23 09:25:55"));
//        articles.add(new Article("Headline 2", "Url 2", "Img 2", 2, 2.0,"2023-03-23 08:50:55"));
//
//        when(mainService.getUpdateArticles()).thenReturn(Arrays.asList(articles.get(1)));
//
//        mockMvc.perform(get("/api/articles/updates")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void 치안_점수_확인() throws Exception {
//        List<Statics> measures = new ArrayList<>();
//        Statics measure = new Statics(1);
//
//        for(int i = 0; i < 12; i++) {
//            measures.add(measure);
//        }
//
//        when(mainService.getStatics(any())).thenReturn(measures);
//
//        mockMvc.perform(get("/api/measures/KO")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void 국가_기사_목록() throws Exception {
//        List<Article> articles = new ArrayList<>();
//        articles.add(new Article("Headline 1", "Url 1", "Img 1", 1, 1.9, "1998-06-13 13:22:55"));
//        articles.add(new Article("Headline 2", "Url 2", "Img 2", 2, 2.0, "1998-06-13 13:22:55"));
//
//        when(mainService.getCountryArticles(any())).thenReturn(articles);
//
//        mockMvc.perform(get("/api/articles/1")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void 지역_기사_목록() throws Exception {
//        List<Article> articles = new ArrayList<>();
//        articles.add(new Article("Headline 1", "Url 1", "Img 1", 1, 1.9, "1998-06-13 13:22:55"));
//        articles.add(new Article("Headline 2", "Url 2", "Img 2", 2, 2.0, "1998-06-13 13:22:55"));
//
//        when(mainService.getCityArticles(anyFloat(), anyFloat())).thenReturn(articles);
//
//        mockMvc.perform(get("/api/articles/20.5/10.3")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//
//}