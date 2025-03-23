import { PlayerSearchRequest } from "src/rest-client/PlayerSearchRequest";
import { SportEnumVisitorWithReturnAbstract } from "./SportEnumVisitorWithReturnAbstract";
import { SportEnum } from "src/enum/SportEnum.model";


export class SportEnumPlayerSearchCreatorVisitor extends SportEnumVisitorWithReturnAbstract<PlayerSearchRequest> {

    override footballSoccer(): PlayerSearchRequest {
        let searchRequest = new PlayerSearchRequest();
        searchRequest.sport = SportEnum.SOCCER;
        searchRequest.budget = 250;
        searchRequest.fmv = 7.5;
        searchRequest.minAge = 18;
        searchRequest.maxAge = 40;
        return searchRequest;
    }
}