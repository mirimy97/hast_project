package com.cst.hast.common;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ResultEnum {

    SUCCESS("success"),
    FAIL("fail"),;

    private final String resultCode;

}
