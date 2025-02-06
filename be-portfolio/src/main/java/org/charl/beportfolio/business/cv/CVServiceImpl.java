package org.charl.beportfolio.business.cv;


import org.charl.beportfolio.presentation.cv.CVRequestModel;
import org.charl.beportfolio.presentation.cv.CVResponseModel;
import reactor.core.publisher.Mono;

public class CVServiceImpl implements CVService {

    @Override
    public Mono<CVResponseModel> getCV() {
        return null;
    }

    @Override
    public Mono<CVResponseModel> updateCV(CVRequestModel cvRequestModel) {
        return null;
    }
}
