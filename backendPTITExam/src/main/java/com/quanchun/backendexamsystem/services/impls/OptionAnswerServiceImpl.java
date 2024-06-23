package com.quanchun.backendexamsystem.services.impls;

import com.quanchun.backendexamsystem.dtos.OptionAnswerDTO;
import com.quanchun.backendexamsystem.mappers.OptionAnswerMapper;
import com.quanchun.backendexamsystem.models.OptionAnswer;
import com.quanchun.backendexamsystem.repositories.OptionAnswerRepository;
import com.quanchun.backendexamsystem.services.OptionAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionAnswerServiceImpl implements OptionAnswerService {
    @Autowired
    private OptionAnswerRepository optionAnswerRepository;

    @Autowired
    private OptionAnswerMapper optionAnswerMapper;

    @Override
    public List<OptionAnswerDTO> saveListOptionAnswers(List<OptionAnswerDTO> optionAnswerList) {
        List<OptionAnswer> optionAnswers = optionAnswerRepository.saveAll(optionAnswerMapper.toEntity(optionAnswerList));
        return optionAnswerMapper.toDto(optionAnswers);
    }
}
