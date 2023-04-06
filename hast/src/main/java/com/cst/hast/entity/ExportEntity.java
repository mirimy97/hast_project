package com.cst.hast.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "export_table")
public class ExportEntity {
    @Id
    @Column(name = "export_event_id")
    private Long exportEventId;

    @Column(name="export_root_code")
    private String exportRootCode;

    @Column(name="export_base_code")
    private String exportBaseCode;

    @Column(name="export_code")
    private String exportCode;

    @Column(name="export_country_code")
    private String exportCountryCode;

    @Column(name="export_lat")
    private double exportLat;

    @Column(name="export_long")
    private double exportLong;

    @Column(name="export_date")
    private LocalDate exportDate;

    @Column(name="export_datetime")
    private Date articleDateTime;

    @Column(name="export_url")
    private String exportUrl;

    @Column(name="export_score")
    private double exportScore;

    @Column(name="export_row_count")
    private Long exportRowCount;

    public ExportEntity(double exportLat, double exportLong, double exportScore, Long exportRowCount) {
        this.exportLat = exportLat;
        this.exportLong = exportLong;
        this.exportScore = exportScore;
        this.exportRowCount = exportRowCount;
    }

    public ExportEntity(String exportCountryCode, double exportScore, Long exportRowCount) {
        this.exportCountryCode = exportCountryCode;
        this.exportScore = exportScore;
        this.exportRowCount = exportRowCount;
    }

}

