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
// let sessionID = getCookie(COOKIE_SESSION_ID);
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
    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' };

    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];

    let i=1;

    for(const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);

        html += "<tr>" +
            "<td>" +"<span>"+i+"."+"</span>"+ entry['player'] + "</td>" +
            "<td>" + entry['score'] + "</td>" +
            "<td>" + formattedDate + "</td>" +
            "</tr>";
        i++;
    }
    let leaderboardElement = document.getElementById('output-table'); // table
    leaderboardElement.innerHTML += html; // append generated HTML to existing
}
