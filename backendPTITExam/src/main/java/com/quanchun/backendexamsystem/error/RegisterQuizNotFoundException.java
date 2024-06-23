package com.quanchun.backendexamsystem.error;

public class RegisterQuizNotFoundException extends Exception{
    public RegisterQuizNotFoundException(String message, Long quizId){
        super();
    }

    public RegisterQuizNotFoundException(String message){
        super(message);
    }

    public RegisterQuizNotFoundException(String message, Throwable cause){
        super(message, cause);
    }

    public RegisterQuizNotFoundException(Throwable cause){
        super(cause);
    }

    protected RegisterQuizNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace){
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
