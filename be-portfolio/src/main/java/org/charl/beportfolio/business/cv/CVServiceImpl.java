package org.charl.beportfolio.business.cv;

import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.dataaccess.cv.CVRepository;
import org.charl.beportfolio.presentation.cv.CVRequestModel;
import org.charl.beportfolio.presentation.cv.CVResponseModel;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class CVServiceImpl implements CVService {

    private final CVRepository cvRepository;

    public CVServiceImpl(CVRepository cvRepository) {
        this.cvRepository = cvRepository;
    }

    @Override
    public Mono<CVResponseModel> getCV() {
        return cvRepository.findAll()
                .next()
                .map(cvEntity -> {
                    CVResponseModel cvResponseModel = new CVResponseModel();
                    cvResponseModel.setFileName(cvEntity.getFileName());
                    cvResponseModel.setFileUrl(cvEntity.getFileUrl());
                    cvResponseModel.setUploadedAt(cvEntity.getUploadedAt());
                    return cvResponseModel;
                });
    }

    @Override
    public Mono<CVResponseModel> updateCV(CVRequestModel cvRequestModel) {
        return cvRepository.findAll()
                .next()
                .map(cvEntity -> {
                    cvEntity.setFileName(cvRequestModel.getFileName());
                    cvEntity.setFileUrl(cvRequestModel.getFileUrl());
                    cvEntity.setUploadedAt(cvRequestModel.getUploadedAt());
                    return cvEntity;
                })
                .flatMap(cvRepository::save)
                .map(cvEntity -> {
                    CVResponseModel cvResponseModel = new CVResponseModel();
                    cvResponseModel.setFileName(cvEntity.getFileName());
                    cvResponseModel.setFileUrl(cvEntity.getFileUrl());
                    cvResponseModel.setUploadedAt(cvEntity.getUploadedAt());
                    return cvResponseModel;
                });
    }
}