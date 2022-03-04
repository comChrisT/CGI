
// COOKIES
const COOKIE_CHALLENGE_NAME = "THWebApp-challengeName";
const COOKIE_PLAYER_NAME = "THWebApp-playerName";
const COOKIE_SESSION_ID = "THWebApp-sessionID";
const COOKIE_TOTALL_QUESTIONS = "THWebApp-totallQuestions";


// Creates cookie with a given name, value and expire date in days
function createCookie(cookieName, cookieValue, expireDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires;
}

// Gets the value of cookie providing the key
function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
