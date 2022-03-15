async function getLeaderBoard(url) {
// create and invoke the http request
    fetch(url, { method: "GET"})
        .then(response => response.json())
        .then(json => handleLeaderboard(json));
}


let url = TH_LEADERBOARD_URL + "?sorted&session="+sessionID; // form url
getLeaderBoard(url);

/**
 * A function to handle the JSON-formatted reply of '/leaderboard' call
 */
async function handleLeaderboard(leaderboard) {
    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' };

    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];

    //player rank
    let position=1;
    //CURRENT player rank
    let current_position=1;
    var playerName=getCookie(COOKIE_PLAYER_NAME);

    for(const entry of leaderboardArray) {

        if(playerName===entry['player']){
            current_position=position;
        }
        if(position===1 && playerName!==entry['player']){
            html += "<tr id='gold'>" +
                "<td>" +"<span>"+position+"."+"</span>"+ entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "</tr>";
        }
        else if(position===2&& playerName!==entry['player']){
            html += "<tr id='silver'>" +
                "<td>" +"<span>"+position+"."+"</span>"+ entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "</tr>";
        }
        else if (position===3&& playerName!==entry['player']){
            html += "<tr id='bronze'>" +
                "<td>" + "<span>" + position + "." + "</span>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "</tr>";
        }
        else if(playerName!==entry['player']){
            html += "<tr>" +
                "<td>" + "<span>" + position + "." + "</span>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "</tr>";
        }
        else
            html += "<tr  id='currentPlayer'>" +
                "<td>" + "<span>" + position + "." + "</span>" + entry['player'] + "</td>" +
                "<td>" + entry['score'] + "</td>" +
                "</tr>";
        position++;
    }

    //function to get score with /th/api/score API call
    async function LeaderboardScore() {

        const reply = await fetch(TH_SCORE_URL + "?session=" + sessionID);
        const score_obj = await reply.json();
        if(score_obj.status=="OK"){
            document.getElementById("player-rank").innerHTML+="<h3>"+"With "+score_obj.score+"pts"+"</h3>";
        }
    }
    document.getElementById("player-rank").innerHTML+=
        "<h2>"+"Your position:  "+current_position+"</h2>";

    LeaderboardScore();
    let leaderboardElement = document.getElementById('output-table'); // table
    leaderboardElement.innerHTML += html; // append generated HTML to existing
}
