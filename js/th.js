// ALL API URL
const TH_BASE_URL = "https://codecyprus.org/th/api/";
const TH_LIST_URL = TH_BASE_URL+"list";
const TH_START_URL = TH_BASE_URL+"start";
const TH_QUESTION_URL = TH_BASE_URL+"question";
const TH_ANSWER_URL = TH_BASE_URL+"answer";
const TH_SCORE_URL = TH_BASE_URL+"score";
const TH_SKIP_URL = TH_BASE_URL+"skip";
const TH_LEADERBOARD_URL = TH_BASE_URL+"leaderboard";
const TH_TEST_URL = "https://codecyprus.org/th/test-api/";


// API - list call
async function get_List() {
    // display loder, hide content
    document.getElementById("loader").style.display="block";
    document.getElementById("mainContent").style.display="none";


    // call the web service and await for the reply to come back and be converted to JSON
    const reply = await fetch(TH_LIST_URL);
    const list_obj = await reply.json();

    console.log("List API:");console.log(list_obj);//***********************|    Test    |***********************

    let treasureHuntsArray = list_obj.treasureHunts;
    let chaList = "<ul class='Chall_list'>"; // dynamically form the HTML code to display the list of treasure hunts
    let currTime = new Date().getTime(); // Get current time (miliseconds)
    for(let i = 0; i < treasureHuntsArray.length; i++) {
        let startTime = treasureHuntsArray[i].startsOn; // Get the treasure hunt start time
        // active
        if(currTime + 300000 >= startTime){
            chaList += "<li>"
                    +  "<a class='active' href='register.html?uuid="+treasureHuntsArray[i].uuid+"&name="+treasureHuntsArray[i].name+"'>"+treasureHuntsArray[i].name+"</a>"
                    +  "</li>";
        }
        // inactive
        else {
            chaList += "<li>"
                    +  "<a class='inactive' onclick='alert(\"< "+treasureHuntsArray[i].name+" > is inactive. Please choose a different one\")'>"+treasureHuntsArray[i].name+"</a>"
                    +  "</li>";
        }


    }
    chaList += "</ul>";
    // update the DOM with the newly created list
    document.getElementById("lists").innerHTML = chaList;
    // last show the content
    document.getElementById("loader").style.display="none";
    document.getElementById("mainContent").style.display="block";
}

// API - start call
async function start(){
    // Retrieve the query string data from the URL
    const params = new URLSearchParams(location.search);
    // Get the values of query keys and store to the variables
    let playerNAME= params.get("playerName");
    let ChallengeNAME= params.get("NAME");
    let ChallengeUUID= params.get("UUID");

    // Request from server
    const reply = await fetch(TH_START_URL +"?player="+playerNAME+"&app="+ChallengeNAME+"&treasure-hunt-id="+ChallengeUUID);
    const start_obj = await reply.json();

    console.log("Question API:");console.log(start_obj);//***********************|    Test    |***********************

    // checks for errors
    if(start_obj.status=="OK") {
        // creates four cookies
        createCookie(COOKIE_CHALLENGE_NAME,ChallengeNAME,1);
        createCookie(COOKIE_PLAYER_NAME,playerNAME,1);
        createCookie(COOKIE_SESSION_ID, start_obj.session, 1);
        createCookie(COOKIE_TOTALL_QUESTIONS, start_obj.numOfQuestions, 1);
        // status ok proceed to question page
        window.location.replace("questions.html");
    }
    else{
        // status error display msg go back
        alert(start_obj.status+":\n"+start_obj.errorMessages);
        history.back();
    }

}



