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

    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];

    //player rank
    let position=1;

    //CURRENT player rank
    let current_position=1;

    //get player name from cookie
    let playerName=getCookie(COOKIE_PLAYER_NAME);

    for(const entry of leaderboardArray) {

        //check if entry is the current player
        if(playerName===entry['player']){
            current_position=position;
        }

        //Rank specific output
        if(position===1 && playerName!==entry['player']){
            html +=
                "<li id='gold'>"+
                "<div class='player-name'>"+
                "<span class='player-rank'>"+
                position+
                "."+
                "</span>"+
                entry['player']+"</div>"+
                "<div class='score'>"+entry['score']+
                "</div>"+
                "</li>"

        }
        else if(position===2&& playerName!==entry['player'] && playerName.length < 20){
            html +=
                "<li id='silver'>"+
                "<div class='player-name'>"+
                "<span class='player-rank'>"+
                position+
                "."+
                "</span>"+
                entry['player']+"</div>"+
                "<div class='score'>"+entry['score']+
                "</div>"+
                "</li>"

        }
        else if (position===3&& playerName!==entry['player'] && playerName.length < 20){
            html +=
                "<li id='bronze'>"+
                "<div class='player-name'>"+
                "<span class='player-rank'>"+
                position+
                "."+
                "</span>"+
                entry['player']+"</div>"+
                "<div class='score'>"+entry['score']+
                "</div>"+
                "</li>"

        }

        //any other player
        else if(playerName!==entry['player']){
            html +=
                "<li>"+
                "<div class='player-name'>"+
                "<span class='player-rank'>"+
                position+
                "."+
                "</span>"+
                entry['player']+"</div>"+
                "<div class='score'>"+entry['score']+
                "</div>"+
                "</li>"
        }
        //current player
        else
            html +=
                "<li id='current-player'>"+
                "<div class='player-name'>"+
                "<span class='player-rank'>"+
                position+
                "."+
                "</span>"+
                entry['player']+"</div>"+
                "<div class='score'>"+entry['score']+
                "</div>"+
                "</li>"

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
    //personalised message for current player
    document.getElementById("player-rank").innerHTML+=
        "<h2>"+"Your position:  "+current_position+"</h2>";

    LeaderboardScore();

    let leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML += html; // append generated HTML to existing
}
