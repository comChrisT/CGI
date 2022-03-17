
// session id
var sessionID = getCookie(COOKIE_SESSION_ID);

// clears all input fields
function emptyAllAnsField(){
    document.getElementById("ansINT").value="";
    document.getElementById("ansNUM").value="";
    document.getElementById("ansTXT").value="";
}
// hide all answer forms
function hideAllForms(){
    document.getElementById("BOOLEAN").style.display="none";
    document.getElementById("INTEGER").style.display="none";
    document.getElementById("NUMERIC").style.display="none";
    document.getElementById("MCQ").style.display="none";
    document.getElementById("TEXT").style.display="none";
}
// popup message
function popUP(msg){
    let pop=document.getElementById("popup_Msg");

    pop.innerHTML=msg;
    // show
    pop.style.transition="opacity 1s";
    pop.style.opacity="1";
    pop.style.transition="margin 1s";
    pop.style.margin="0 0 10px 0";
    // hide
    function hide(){
        pop.style.transition="opacity 1s";
        pop.style.opacity="0";
        pop.style.transition="margin 1s";
        pop.style.margin="0";
    }
    setTimeout(hide,2000);
}
// Score API
async function Score(){

    const reply = await fetch(TH_SCORE_URL +"?session="+sessionID);
    const score_obj = await reply.json();

    console.log("Score API:");console.log(score_obj);//***********************|    Test    |***********************

    if(score_obj.status=="OK"){
        document.getElementById("pScore").innerHTML=score_obj.score;
    }
    else{
        alert(score_obj.status+":\n"+score_obj.errorMessages);
    }

}
// Get the geolocation of client
function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLocation, showError);
    }
    else {
        alert("Geolocation is not supported by your browser.");
    }
}
// Send to the server
async function updateLocation(currPos){

    const reply = await fetch(TH_LOCATION_URL+"?session="+sessionID+"&latitude="+currPos.coords.latitude+"&longitude="+currPos.coords.longitude);
    const location_obj = await reply.json();

    console.log("Location API:");console.log(location_obj);//***********************|    Test    |***********************

    if(location_obj.status=="ERROR"){
        alert(location_obj.status+":\n"+"1. Session expired\n2. Missing or Invalid parameters: session, latitude, longitude");
        window.location.replace("leaderboard.html?sessionID="+sessionID);
    }

}
var keepUpdate=true; // used to auto update lodacation if client allowed
// In case something goes wrong when allowed
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
             alert("User denied the request for Geolocation.");
             keepUpdate=false;
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
function AutoUpdateLocation(){
    if(keepUpdate==true){
        // Keep getting the location every 2 min
        setInterval(getLocation, 120000);
    }
}

var reqGeo; // used to update location before answer
// Questions API
async function get_Question() {

    document.getElementById("loader").style.display="block";
    document.getElementById("mainContent").style.display="none";

    // reset
    emptyAllAnsField();
    hideAllForms();

    const reply = await fetch(TH_QUESTION_URL +"?session="+sessionID);
    const question_obj = await reply.json();

    console.log("Question API:");console.log(question_obj);//***********************|    Test    |***********************

    // check status
    if(question_obj.status=="OK") {
        // no more question
        if(question_obj.completed==true){
            alert("That was the last question.");
            window.location.replace("leaderboard.html?sessionID="+sessionID);
        }
        // display the question
        document.getElementById("Box_Msg").innerHTML=question_obj.questionText;
        // skippable question
        if(question_obj.canBeSkipped==true){
            document.getElementById("skipBtn").style.display="inline";
        }
        else {
            document.getElementById("skipBtn").style.display="none";
        }
        // question requre location
        if(question_obj.requiresLocation==true){
            reqGeo=true;
            document.getElementById("Box_Msg").innerHTML+="<p class='reqGeo'>Please make sure to <u>ALLOW</u> geolocation for this specific question!</p>";
        }
        else{
            reqGeo=false;
        }
        // show the appropriate answer form based on the question type
        document.getElementById(question_obj.questionType).style.display="inline";


    }
    else {
        // display error msg, go back
        alert(question_obj.status+":\n"+question_obj.errorMessages);
        history.back();
    }

    // shows content after its loaded
    document.getElementById("loader").style.display="none";
    document.getElementById("mainContent").style.display="block";

}

async function ans_Question(ans){

    if(navigator.onLine==false){
        popUP("Connection error, Please make sure you have an internet connection");
    }
    else{
        //update location
        if(reqGeo==true){
            getLocation();
        }

        const reply = await fetch(TH_ANSWER_URL +"?session="+sessionID+"&answer="+ans);
        const answer_obj = await reply.json();

        console.log("Answer API:");console.log(answer_obj);//***********************|    Test    |***********************

        if(answer_obj.status=="OK"){
            popUP(answer_obj.message);
            Score();
            get_Question();

        }
        else{
            alert(answer_obj.status+":\n"+answer_obj.errorMessages);
            window.location.replace("leaderboard.html?sessionID="+sessionID);
        }

    }

}

function handleInput(ans){

    // if answer is not provided
    if(ans === "" || ans == null){
        popUP("Please provide an answer");
    }
    // Integer form is displayed, check the answer if its integer
    else if(document.getElementById("INTEGER").style.display == "inline" && Number.isInteger(Number(ans))==false){
        popUP("Please provide an INTEGER ( 1, 2, 3, ... )")
    }
    else{
        ans_Question(ans);
    }


}

async function skipQ(){

    const reply = await fetch(TH_SKIP_URL +"?session="+sessionID);
    const skip_obj = await reply.json();

    console.log("Skip API:");console.log(skip_obj);//***********************|    Test    |***********************

    if(skip_obj.status=="OK"){
        if(skip_obj.completed==true){
            popUP("Skipped last question");
        }
        else{
            popUP("Question skipped");
        }
        get_Question();
    }
    else{
        alert(skip_obj.status+":\n"+skip_obj.errorMessages);
        window.location.replace("leaderboard.html?sessionID="+sessionID);
    }
}
