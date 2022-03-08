
// Get questions from the server
async function get_Question() {
    // a loder animetion *not implemented yet

    let sessionID = getCookie(COOKIE_SESSION_ID);

    const reply = await fetch(TH_QUESTION_URL +"?session="+sessionID);
    const question_obj = await reply.json();

    console.log(question_obj);// test

    // check status
    if(question_obj.status=="OK") {
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
    document.getElementById("mainContent").style.display="block";
}


async function Score(){


}

async function ans_Question(){


}