package kr.touroot.authentication.infrastructure;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncryptor {

    public static final int HEXADECIMAL = 16;

    public String encrypt(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");

            byte[] message = md.digest(password.getBytes());
            BigInteger number = new BigInteger(1, message);

            return number.toString(HEXADECIMAL);
        } catch (NoSuchAlgorithmException exception) {
            throw new RuntimeException();
        }
    }
}
