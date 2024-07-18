package woowacourse.touroot.travelogue.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import woowacourse.touroot.travelogue.dto.TravelogueResponse;
import woowacourse.touroot.travelogue.service.TravelogueFacade;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/travelogues")
public class TravelogueController {

    private final TravelogueFacade travelogueFacade;

    @GetMapping("/{id}")
    public ResponseEntity<TravelogueResponse> findTravelogue(@PathVariable Long id) {
        return ResponseEntity.ok(travelogueFacade.findTravelogueById(id));
    }
}
