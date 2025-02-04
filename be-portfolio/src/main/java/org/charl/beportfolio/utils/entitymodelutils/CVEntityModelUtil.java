package org.charl.beportfolio.utils.entitymodelutils;

import org.charl.beportfolio.dataaccess.cv.CV;
import org.charl.beportfolio.presentation.cv.CVRequestModel;
import org.charl.beportfolio.presentation.cv.CVResponseModel;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;

public class CVEntityModelUtil {

    // Method to convert a CV entity to a CVResponseModel
    public static CVResponseModel toCVResponseModel(CV cv) {
        CVResponseModel cvResponseModel = new CVResponseModel();
        BeanUtils.copyProperties(cv, cvResponseModel);

        if (cv.getFileName() != null) {
            cvResponseModel.setFileName(cv.getFileName());
        }
        if (cv.getFileUrl() != null) {
            cvResponseModel.setFileUrl(cv.getFileUrl());
        }
        if (cv.getUploadedAt() != null) {
            cvResponseModel.setUploadedAt(cv.getUploadedAt());
        }

        return cvResponseModel;
    }

    // Method to map a CVRequestModel to a CV entity
    public static CV toCVEntity(CVRequestModel cvRequestModel) {
        return CV.builder()
                .id(generateUUIDString()) // Generate a unique CVId
                .fileName(cvRequestModel.getFileName())
                .fileUrl(cvRequestModel.getFileUrl())
                .uploadedAt(LocalDate.now())
                .build();
    }

    // Utility method to generate a UUID string
    private static String generateUUIDString() {
        return java.util.UUID.randomUUID().toString();
    }
}

