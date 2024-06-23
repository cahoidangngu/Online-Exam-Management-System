package com.quanchun.backendexamsystem.services;

import com.quanchun.backendexamsystem.dtos.OptionAnswerDTO;

import java.util.List;


public interface OptionAnswerService {

    List<OptionAnswerDTO> saveListOptionAnswers(List<OptionAnswerDTO> optionAnswerList);
}
