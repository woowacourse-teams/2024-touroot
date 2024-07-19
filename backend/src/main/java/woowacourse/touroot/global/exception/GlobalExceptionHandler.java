package woowacourse.touroot.global.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import woowacourse.touroot.global.exception.dto.ExceptionResponse;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionResponse> handleBadRequestException(BadRequestException exception) {
        log.info("BAD_REQUEST_EXCEPTION :: message = {}", exception.getMessage());
        ExceptionResponse data = new ExceptionResponse(exception.getMessage());
        return ResponseEntity.badRequest()
                .body(data);
    }
}
