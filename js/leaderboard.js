// let sessionID = getCookie(COOKIE_SESSION_ID);
//console.log(output);


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

    for(const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);
        if(i===1){
            html += "<tr id='gold'>" +
                "<td>" +"<span>"+i+"."+"</span>"+ entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + formattedDate + "</td>" +
                "</tr>";
        }
        else if(i===2){
            html += "<tr id='silver'>" +
                "<td>" +"<span>"+i+"."+"</span>"+ entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + formattedDate + "</td>" +
                "</tr>";
        }
        else if (i===3){
            html += "<tr id='bronze'>" +
                "<td>" + "<span>" + i + "." + "</span>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + formattedDate + "</td>" +
                "</tr>";
        }
        else {
            html += "<tr>" +
                "<td>" + "<span>" + i + "." + "</span>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "<td>" + formattedDate + "</td>" +
                "</tr>";
        }
        i++;
    }
    let leaderboardElement = document.getElementById('output-table'); // table
    leaderboardElement.innerHTML += html; // append generated HTML to existing
}
