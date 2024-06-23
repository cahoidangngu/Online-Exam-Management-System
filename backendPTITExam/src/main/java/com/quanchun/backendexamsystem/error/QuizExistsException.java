package com.quanchun.backendexamsystem.error;

public class QuizExistsException extends Exception{
    public QuizExistsException(){super();}

    public QuizExistsException(String message){super(message);}
    public QuizExistsException(String message, Throwable cause){super(message,cause);}
    public QuizExistsException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace){super(message, cause, enableSuppression, writableStackTrace);}
}
