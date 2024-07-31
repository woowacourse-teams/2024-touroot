package kr.touroot.global.exception;

import kr.touroot.global.exception.dto.ExceptionResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exception
    ) {
        log.info("METHOD_ARGUMENT_NOT_VALID_EXCEPTION :: message = {}", exception.getMessage());

        String message = exception.getBindingResult()
                .getAllErrors()
                .get(0)
                .getDefaultMessage();
        ExceptionResponse data = new ExceptionResponse(message);
        return ResponseEntity.badRequest()
                .body(data);
    }

    @ExceptionHandler(ClientException.class)
    public ResponseEntity<ExceptionResponse> handleClientException(ClientException exception) {
        log.error("CLIENT_EXCEPTION :: message = {}", exception.getMessage());

        ExceptionResponse data = new ExceptionResponse(exception.getMessage());
        return ResponseEntity.internalServerError().body(data);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ExceptionResponse> handleUploadExceedException(MaxUploadSizeExceededException exception) {
        log.info("UPLOAD_SIZE_EXCEPTION :: message = {}", exception.getMessage());

        ExceptionResponse data = new ExceptionResponse("파일 업로드 용량을 초과하였습니다.");
        return ResponseEntity.badRequest().body(data);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ExceptionResponse> handleForbiddenException(ForbiddenException exception) {
        log.warn("FORBIDDEN_EXCEPTION :: message = {}", exception.getMessage());

        ExceptionResponse data = new ExceptionResponse(exception.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(data);
    }
}
