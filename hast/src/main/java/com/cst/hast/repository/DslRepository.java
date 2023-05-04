package com.cst.hast.repository;


import com.cst.hast.dto.Article;
import com.cst.hast.dto.ChartData;
import com.cst.hast.dto.Country;
import com.cst.hast.entity.ExportEntity;
import com.cst.hast.entity.PointEntity;
import com.cst.hast.entity.QPointEntity;
import com.cst.hast.entity.QStatisticsEntity;
import com.querydsl.core.types.*;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.YearMonth;
import java.util.List;

import static com.cst.hast.entity.QPointEntity.pointEntity;
import static com.cst.hast.entity.QExportEntity.exportEntity;
import static com.cst.hast.entity.QStatisticsEntity.statisticsEntity;
import static com.querydsl.core.types.Projections.constructor;

@Repository
@RequiredArgsConstructor
public class DslRepository {


    private final JPAQueryFactory queryFactory;

    // 2d 맵 점 찍기 - 세계
    public List<ExportEntity> findWorldDots() {
        return queryFactory.select(constructor(
                        ExportEntity.class,
                        exportEntity.exportLat,
                        exportEntity.exportLong,
                        exportEntity.exportScore.sum(),
                        exportEntity.exportRowCount.sum()))
                .from(exportEntity)
                .groupBy(exportEntity.exportLat, exportEntity.exportLong)
                .where(exportEntity.exportScore.goe(0).and(exportEntity.exportRowCount.gt(0)))
                .fetch();
    }

    // 2d 맵 점 찍기 - 국가
    public List<ExportEntity> findCountryDots(String code) {
        return queryFactory.select(constructor(
                        ExportEntity.class,
                        exportEntity.exportLat,
                        exportEntity.exportLong,
                        exportEntity.exportScore.sum(),
                        exportEntity.exportRowCount.sum()))
                .from(exportEntity)
                .where(exportEntity.exportCountryCode.eq(code).and(exportEntity.exportRowCount.gt(0)))
                .groupBy(exportEntity.exportLat, exportEntity.exportLong)
                .where(exportEntity.exportScore.goe(0))
                .fetch();
    }


    // 메인 페이지 점
    public List<ExportEntity> findCountryScore() {
        return queryFactory.select(constructor(
                        ExportEntity.class,
                        exportEntity.exportCountryCode,
                        exportEntity.exportScore.sum(),
                        exportEntity.exportRowCount.sum()))
                .from(exportEntity)
                .groupBy(exportEntity.exportCountryCode)
                .fetch();
    }

    // 메인페이지 국가 위험도순 순위
    public List<Country> findCountryByScore() {
        return queryFactory.select(constructor(Country.class, exportEntity.exportCountryCode,
                        exportEntity.exportScore.sum(), exportEntity.exportRowCount.sum()))
                .from(exportEntity)
                .groupBy(exportEntity.exportCountryCode)
                .orderBy(exportEntity.exportScore.sum().doubleValue()
                        .divide(exportEntity.exportRowCount.sum().doubleValue()).desc())
                .limit(10)
                .fetch();
    }

    public List<ChartData> findByCode(@Param("countryCode") String countryCode) {

        QStatisticsEntity se = new QStatisticsEntity("se");
        QStatisticsEntity se2 = new QStatisticsEntity("se2");
        Integer currentMonth = YearMonth.now().getMonthValue();
        return queryFactory
                .select(Projections.constructor(ChartData.class,
                        se.statisticsMonth,
                        se.statisticsGkgTone,
                        se2.statisticsGkgTone.divide(se2.statisticsRowCount),
                        se.statisticsRowCount,
                        se.statisticsCrimeCount,
                        se.statisticsAccidentCount,
                        se.statisticsDiseaseCount,
                        se.statisticsDisasterCount,
                        se.statisticsPoliticCount,
                        se.statisticsEtcCount))
                .from(se)
                .join(se2)
                .on(se.statisticsMonth.eq(se2.statisticsMonth))
                .where(se.statisticsCountryCode.eq(countryCode)
                        .and(se2.statisticsCountryCode.eq("ZZ")))
                .orderBy(
                        Expressions.stringTemplate("(cast({0} as integer) - {1} + 12) % 12", se.statisticsMonth, currentMonth).asc()
                )
                .fetch();
    }


}

