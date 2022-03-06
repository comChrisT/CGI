const TH_API_URL = "https://codecyprus.org/th/api"; // the API base url

//get session id from cookies
function getCookie(cookieName ){
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
let sessionID = getCookie(COOKIE_SESSION_ID);
//console.log(output);

function getLeaderBoard(url) {
// create and invoke the http request
    fetch(url, { method: "GET"})
        .then(response => response.json())
        .then(json => handleLeaderboard(json));
}


let url = TH_API_URL + "/leaderboard?sorted&limit=100&session="+sessionID; // form url
getLeaderBoard(url);

/**
 * A function to handle the JSON-formatted reply of '/leaderboard' call
 *
 * @param leaderboard for an example of how leaderboard is encoded in JSON,
 * see sample output of '/leaderboard’ at https://codecyprus.org/th#leaderboard
 */
function handleLeaderboard(leaderboard) {
    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];

    console.log(leaderboard);
    for(const entry of leaderboardArray) {
        html += "<tr>" +
            "<td>" + entry['player'] + "</td>" +
            "<td>" + entry['score'] + "</td>" +
            "<td>" + entry['completionTime'] + "</td>" +
            "</tr>";
    }
    let leaderboardElement = document.getElementById('test-results-table'); // table
    leaderboardElement.innerHTML += html; // append generated HTML to existing
}
