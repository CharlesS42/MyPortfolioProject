package org.charl.beportfolio.business.cv;

import org.charl.beportfolio.presentation.cv.CVRequestModel;
import org.charl.beportfolio.presentation.cv.CVResponseModel;
import reactor.core.publisher.Mono;

public interface CVService {
    Mono<CVResponseModel> getCV();
    Mono<CVResponseModel> updateCV(CVRequestModel cvRequestModel);
}
