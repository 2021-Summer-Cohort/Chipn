// https://www.w3schools.com/js/js_cookies.asp

export function getCookie(name)
{
    let _name = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(_name) == 0) {
            return c.substring(_name.length, c.length);
        }
    }
    return "";
}


// https://plainjs.com/javascript/utilities/set-cookie-get-cookie-and-delete-cookie-5/

export function setCookie(name, value, days)
{
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + "; path=/; expires=" + d.toGMTString();
}

export function deleteCookie(name)
{
    setCookie(name, '', -1);
}
