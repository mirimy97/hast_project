package com.cst.hast.common;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Data
@RequiredArgsConstructor
public class Response<T> {

    private final T result;
    private final ResultEnum resultCode;


    public static <T> Response<T> of(T result, ResultEnum resultCode) {
        return new Response<>(result, resultCode);
    }


    public static <T> Response<T> of(T result) {
        return new Response<>(result, ResultEnum.SUCCESS);
    }


    public static Response<Void> ofSuccess() {
        return new Response<>(null, ResultEnum.SUCCESS);
    }


    public static Response<Void> ofError(ResultEnum resultCode) {
        return new Response<Void>(null, ResultEnum.FAIL);
    }

}
