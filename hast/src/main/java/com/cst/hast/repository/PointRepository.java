package com.cst.hast.repository;

import com.cst.hast.dto.PointArticle;
import com.cst.hast.entity.PointEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointRepository extends JpaRepository<PointEntity, Long>{

    // 마커 기사 500개
    @Query(value = "SELECT * " +
            "FROM point_table pt " +
            "INNER JOIN ( " +
            "    SELECT point_url, MIN(point_event_id) AS min_id " +
            "    FROM point_table " +
            "    WHERE point_event_id IN ( " +
            "        SELECT export_event_id " +
            "        FROM export_table " +
            "        WHERE export_lat =:lat AND export_long =:lon" +
            "    ) " +
            "    GROUP BY point_url " +
            ") pt2 ON pt.point_url = pt2.point_url AND pt.point_event_id = pt2.min_id " +
            "WHERE pt.point_score >= 0 " +
            "ORDER BY pt.point_datetime desc " +
            "LIMIT 500", nativeQuery = true)
    public List<PointEntity> findByLocation(@Param("lat") double lat, @Param("lon") double lon);

    // 2d 맵 사이드바 기사 500개
    @Query(value = "SELECT * " +
            "FROM point_table pt " +
            "INNER JOIN ( " +
            "    SELECT point_url, MIN(point_event_id) AS min_id " +
            "    FROM point_table " +
            "    GROUP BY point_url " +
            ") pt2 ON pt.point_url = pt2.point_url AND pt.point_event_id = pt2.min_id " +
            "WHERE pt.point_country_code =:code AND pt.point_score >= 0 " +
            "ORDER BY pt.point_datetime desc " +
            "limit 500;", nativeQuery = true)
    public List<PointEntity> findUpdatedArticles(String code);


}
