import * as API from "./api-actions"
import * as COOKIE from "./cookie"

export default function exportFunctions() {
    _getAccount = API.getAccount;
    _setChipCount = API.setChipCount;
    _modifyChipCount = API.modifyChipCount;
    _updateStuff = API.updateStuff;
    _getCookie = COOKIE.getCookie;
    _setCookie = COOKIE.setCookie;
    _deleteCookie = COOKIE.deleteCookie;
}
