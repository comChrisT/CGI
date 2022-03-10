
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

        if(question_obj.canBeSkipped==true){
            document.getElementById("skipBtn").style.display="inline";
        }
        else {
            document.getElementById("skipBtn").style.display="none";
        }
        // display the question
        document.getElementById("Box_Msg").innerHTML=question_obj.questionText;
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
        //update location *not implemented yet


        const reply = await fetch(TH_ANSWER_URL +"?session="+sessionID+"&answer="+ans);
        const answer_obj = await reply.json();

        console.log("Answer API:");console.log(answer_obj);//***********************|    Test    |***********************

        if(answer_obj.status=="OK"){
            if(answer_obj.completed==true){
                alert("That was the last question");
                window.location.replace("leaderboard.html?sessionID="+sessionID);
            }

            popUP(answer_obj.message);
            Score();
            get_Question();

        }
        else{
            alert(answer_obj.status+":\n"+answer_obj.errorMessages);
            window.location.replace("leaderboard.html?session="+sessionID);
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
        if(skip_obj.completed==false){
            popUP("Question skipped");
            get_Question();
        }
    }
    else{
        alert(score_obj.status+":\n"+score_obj.errorMessages);
    }
}