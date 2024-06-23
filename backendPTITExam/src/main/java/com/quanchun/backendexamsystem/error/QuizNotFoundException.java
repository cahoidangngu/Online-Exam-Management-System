package com.quanchun.backendexamsystem.error;

public class QuizNotFoundException extends Exception{
    public QuizNotFoundException(){super();}

    public QuizNotFoundException(String message){super(message);}
    public QuizNotFoundException(String message, Throwable cause){super(message,cause);}
    public QuizNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace){super(message, cause, enableSuppression, writableStackTrace);}
}
