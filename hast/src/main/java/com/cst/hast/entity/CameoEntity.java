package com.cst.hast.entity;

import javax.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table (name = "cameo_table")
public class CameoEntity {

	@Id
	@Column(name = "cameo_code")
	private Long cameCode;

	@Column(name = "cameo_kor_comment")
	private String cameoKorComment;

	@Column(name = "cameo_eng_comment")
	private String cameoEngComment;

}
