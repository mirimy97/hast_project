package com.cst.hast.entity;

import javax.persistence.*;
import lombok.*;
import org.hibernate.annotations.Subselect;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table (name = "point_table")
public class PointEntity {

	@Id
	@Column(name = "point_id")
	private Long pointId;

	@Column(name = "point_event_id")
	private Long pointEventId;

   	@Column(name = "point_country_code")
	private String pointCountryCode;

   	@Column(name = "point_kor_comment")
	private String pointKorComment;

   	@Column(name = "point_eng_comment")
	private String pointEngComment;

   	@Column(name = "point_sentence")
	private Integer pointSentence;

   	@Column(name = "point_confidence")
	private double pointConfidence;

   	@Column(name = "point_mentions_tone")
	private double pointMentionsTone;

   	@Column(name = "point_gkg_tone")
	private double pointGkgTone;

   	@Column(name = "point_gkg_positive")
	private double pointGkgPositive;

   	@Column(name = "point_gkg_negative")
	private double pointGkgNegative;

   	@Column(name = "point_gkg_activity")
	private double pointGkgActivity;

   	@Column(name = "point_gkg_news")
	private double pointGkgNews;

   	@Column(name = "point_gkg_count")
	private Integer pointGkgCount;


   	@Column(name = "point_event_datetime")
	private LocalDateTime pointEventDatetime;

   	@Column(name = "point_datetime")
	private LocalDateTime pointDatetime;

   	@Column(name = "point_time_diff")
	private Long pointTimeDiff;

   	@Column(name = "point_source")
	private String pointSource;

   	@Column(name = "point_url")
	private String pointUrl;

   	@Column(name = "point_image")
	private String pointImage;

   	@Column(name = "point_theme_crime")
	private double pointThemeCrime;

   	@Column(name = "point_theme_accident")
	private double pointThemeAccident;

   	@Column(name = "point_theme_disease")
	private double pointThemeDisease;

   	@Column(name = "point_theme_disaster")
	private double pointThemeDisaster;

   	@Column(name = "point_theme_politic")
	private double pointThemePolitic;

   	@Column(name = "point_theme_total")
	private double pointThemeTotal;

   	@Column(name = "point_category")
	private Integer pointCategory;

   	@Column(name = "point_year")
	private String pointYear;

   	@Column(name = "point_month")
	private String pointMonth;

   	@Column(name = "point_score")
	private double pointScore;

	public PointEntity(Long pointEventId, String pointKorComment, String pointEngComment, String pointUrl, String pointImage, Integer pointCategory, double pointScore, LocalDateTime pointDatetime) {
		this.pointEventId = pointEventId;
		this.pointKorComment = pointKorComment;
		this.pointEngComment = pointEngComment;
		this.pointUrl = pointUrl;
		this.pointImage = pointImage;
		this.pointCategory = pointCategory;
		this.pointScore = pointScore;
		this.pointDatetime = pointDatetime;
	}


}
