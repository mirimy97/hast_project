package com.cst.hast.exception;

import com.cst.hast.common.ResultEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class HastApplicationException extends RuntimeException{

    @Override
    public String getMessage() {
       return String.format("%s", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
