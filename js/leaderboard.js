function getLeaderBoard(url) {
// create and invoke the http request
    fetch(url, { method: "GET"})
        .then(response => response.json())
        .then(json => handleLeaderboard(json));
}


let url = TH_LEADERBOARD_URL + "?sorted&limit=100&session="+sessionID; // form url
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
    let j=1;
    var playerName=getCookie(COOKIE_PLAYER_NAME);

    for(const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);
        if(playerName===entry['player']){
            j=i;
        }
        if(i===1 && playerName!==entry['player']){
            html += "<tr id='gold'>" +
                "<td>" +"<span>"+i+"."+"</span>"+ entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + formattedDate + "</td>" +
                "</tr>";
        }
        else if(i===2&& playerName!==entry['player']){
            html += "<tr id='silver'>" +
                "<td>" +"<span>"+i+"."+"</span>"+ entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + formattedDate + "</td>" +
                "</tr>";
        }
        else if (i===3&& playerName!==entry['player']){
            html += "<tr id='bronze'>" +
                "<td>" + "<span>" + i + "." + "</span>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + formattedDate + "</td>" +
                "</tr>";
        }
        else if(playerName!==entry['player']){
            html += "<tr>" +
                "<td>" + "<span>" + i + "." + "</span>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + formattedDate + "</td>" +
                "</tr>";
        }
        else
            html += "<tr  id='currentPlayer'>" +
                "<td>" + "<span>" + i + "." + "</span>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + formattedDate + "</td>" +
                "</tr>";
        i++;
    }
    document.getElementById("player-rank").innerHTML+=
        "<h2>"+"Your position:  "+j+"</h2>";
    let leaderboardElement = document.getElementById('output-table'); // table
    leaderboardElement.innerHTML += html; // append generated HTML to existing
}
