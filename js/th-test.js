// Test API calls
const TH_TEST_URL = "https://codecyprus.org/th/test-api/";
const TH_LIST_URL = TH_TEST_URL+"list";
const TH_START_URL = TH_TEST_URL+"start";
const TH_QUESTION_URL = TH_TEST_URL+"question";
const TH_ANSWER_URL = TH_TEST_URL+"answer";
const TH_SCORE_URL = TH_TEST_URL+"score";
const TH_SKIP_URL = TH_TEST_URL+"skip";
const TH_LEADERBOARD_URL = TH_TEST_URL+"leaderboard";


async function test_list(parameter) {

    const reply = await fetch(TH_LIST_URL+"?number-of-ths="+parameter);
    const test = await reply.json();

    // On console
    console.log("List API:");
    console.log(test);
    for(let i = 0; i < test.treasureHunts.length; i++) {

        document.getElementById("test-table").innerHTML
            +="<tr class='output-tr'>"+
            "<td>"+test.treasureHunts[i].name+"</td>"+
            "<td>"+test.treasureHunts[i].description+"</td>"+
            "<td>"+test.treasureHunts[i].ownerEmail+"</td>"+
            "<td>"+test.treasureHunts[i].secretCode+"</td>"+
            "<td>"+test.treasureHunts[i].salt+"</td>"+
            "<td>"+test.treasureHunts[i].visibility+"</td>"+
            "<td>"+test.treasureHunts[i].startsOn+"</td>"+
            "<td>"+test.treasureHunts[i].endsOn+"</td>"+
            "<td>"+test.treasureHunts[i].maxDuration+"</td>"+
            "<td>"+test.treasureHunts[i].shuffled+"</td>"+
            "<td>"+test.treasureHunts[i].requiresAuthentication+"</td>"+
            "<td>"+test.treasureHunts[i].emailResults+"</td>"+
            "<td>"+test.treasureHunts[i].hasPrize+"</td>"+
            "</tr>";
    }
    let defaultValue = parameter;
    let pass = 0;
    if(parameter=="" || parameter<0 ||  parameter > parameter.MAX_SAFE_INTEGER){
        parameter=10;
    }
    if(test.treasureHunts.length==parameter){
        pass = 1;
    }

    console.log(parameter);
    console.log(test.treasureHunts.length);
    if(pass==1) {
        document.getElementById("result").innerHTML +=
            "<tr>" +
            "<td>" + parameter + "</td>" +
            "<td>" + test.treasureHunts.length + "</td>" +
            "<td>" + parameter + "</td>" +
            "<td>" + "PASS" + "</td>" +
            "</tr>";
    }
    else
        document.getElementById("result").innerHTML +=
            "<tr>" +
            "<td>" + parameter + "</td>" +
            "<td>" + test.treasureHunts.length + "</td>" +
            "<td>" + parameter + "</td>" +
            "<td>" + "FAIL" + "</td>" +
            "</tr>";

}

async function test_start(parameter) {

    const reply = await fetch(TH_START_URL+"?player="+parameter);
    const test = await reply.json();

    // On console
    console.log("API request");
    console.log(TH_START_URL+"?player="+parameter);
    console.log("Start API:");
    console.log(test);
    if(test.status!="OK" && parameter!=""){
        document.getElementById("start-result").innerHTML+=
            "<tr>"+
            "<td>"+parameter+"</td>"+
            "<td>"+test.errorMessages+"</td>"+
            "<td>"+test.errorMessages+"</td>"+
            "<td>"+"PASS"+"</td>"+
            "</tr>";
    }
    else if(test.status=="OK" && parameter==""){
        document.getElementById("start-result").innerHTML+=
        "<tr>"+
        "<td>"+"NONE"+"</td>"+
        "<td>"+"STATUS: OK"+"</td>"+
        "<td>"+"STATUS: OK"+"</td>"+
        "<td>"+"PASS"+"</td>"+
        "</tr>";
    }
    else
        {
            document.getElementById("start-result").innerHTML+=
                "<tr>"+
                "<td>"+parameter+"</td>"+
                "<td>"+test.errorMessages+"</td>"+
                "<td>"+test.errorMessages+"</td>"+
                "<td>"+"FAIL"+"</td>"+
                "</tr>";
        }

}

async function test_Question(parameter1,parameter2,parameter3,parameter4) {

    const reply = await fetch(TH_QUESTION_URL+"?"+parameter1+"&question-type="+parameter2+"&"+parameter3+"&"+parameter4);
    const test = await reply.json();

    // On console
    console.log("API request");
    console.log(TH_QUESTION_URL+"?"+parameter1+"&question-type="+parameter2+"&"+parameter3+"&"+parameter4);
    console.log("Question API:");
    console.log(test);
    console.log(parameter2);
    console.log(test.questionType);
    let completed = false;
    let can_be_skipped = false;
    let requires_location = false;
    let type = parameter2.toUpperCase();
    if(type==""){
        type="TEXT";
    }
    console.log(type);
    if(parameter1=="completed"){
        completed = true;
    }
    else if(parameter1=="")
        completed = false;
    if(parameter3=="can-be-skipped"){
        can_be_skipped = true;
    }
    else if(parameter3=""){
        can_be_skipped=false;
    }
    if(parameter4=="requires-location"){
        requires_location=true;
    }
    else if(parameter4=""){
        requires_location = false;
    }
    console.log(completed);
    if(completed==test.completed && can_be_skipped==test.canBeSkipped && requires_location==test.requiresLocation && type==test.questionType){
        document.getElementById("question-result").innerHTML+=
            "<tr>"+
            "<td>"+parameter1+","+parameter2+","+parameter3+","+parameter4+"</td>"+
            "<td>"+test.completed+","+test.questionType+","+test.canBeSkipped+","+test.requiresLocation+"</td>"+
            "<td>"+completed+","+type+","+can_be_skipped+","+requires_location+"</td>"+
            "<td>"+"PASS"+"</td>"+
            "</tr>";
    }
    else {
        document.getElementById("question-result").innerHTML+=
            "<tr>"+
            "<td>"+parameter1+","+parameter2+","+parameter3+","+parameter4+"</td>"+
            "<td>"+test.completed+","+test.questionType+","+test.canBeSkipped+","+test.requiresLocation+"</td>"+
            "<td>"+completed+","+type+","+can_be_skipped+","+requires_location+"</td>"+
            "<td>"+"FAIL"+"</td>"+
            "</tr>";
    }

}

async function test_Answer(parameter1,parameter2,parameter3) {

    const reply = await fetch(TH_ANSWER_URL+"?"+parameter1+"&"+parameter2+"&"+parameter3);
    const test = await reply.json();

    // On console
    console.log("API request");
    console.log(TH_ANSWER_URL+"?"+parameter1+"&"+parameter2+"&"+parameter3);
    console.log("Answer API:");
    console.log(test);
    console.log(parameter1);
    console.log(parameter2);
    console.log(parameter3);
    let correct = false;
    let completed = false;
    let expired = false;
    if(parameter1=="correct"){
        correct = true
    }
    if(parameter2=="completed"){
        completed = true
    }
    if(parameter3=="expired"){
        expired = true
    }
    if(correct==test.correct && completed==test.completed && expired == false){
        document.getElementById("answer-result").innerHTML+=
            "<tr>"+
            "<td>"+parameter1+","+parameter2+","+parameter3+"</td>"+
            "<td>"+test.correct+","+test.completed+"</td>"+
            "<td>"+correct+","+completed+"</td>"+
            "<td>"+"PASS"+"</td>"+
            "</tr>";
    }
    else if (expired == true){
        document.getElementById("answer-result").innerHTML+=
            "<tr>"+
            "<td>"+parameter1+","+parameter2+","+parameter3+"</td>"+
            "<td>"+test.errorMessages+"</td>"+
            "<td>"+test.errorMessages+"</td>"+
            "<td>"+"PASS"+"</td>"+
            "</tr>";
    }
    else
        document.getElementById("answer-result").innerHTML+=
            "<tr>"+
            "<td>"+parameter1+","+parameter2+","+parameter3+"</td>"+
            "<td>"+test.correct+","+test.completed+"</td>"+
            "<td>"+correct+","+completed+"</td>"+
            "<td>"+"FAIL"+"</td>"+
            "</tr>";

}

async function test_Score(parameter1,parameter2,parameter3,parameter4) {

    const reply = await fetch(TH_SCORE_URL+"?score="+parameter1+"&"+parameter2+"&"+parameter3+"&"+parameter4);
    const test = await reply.json();

    // On console
    console.log("API request");
    console.log(TH_SCORE_URL+"?score="+parameter1+"&"+parameter2+"&"+parameter3+"&"+parameter4);
    console.log("Score API:");
    console.log(test);
    let score = parameter1;
    if(parameter1=="" ||  parameter1 > parameter1.MAX_SAFE_INTEGER){
        score=42;
    }
    if(parameter1<-1000){
        score = -1000;
    }
    if(parameter1 > 1000){
        score = 1000;
    }
    let completed = false;
    let error = false;
    let finished = false;
    if(parameter2=="completed"){
        completed = true
    }
    if(parameter3=="finished"){
        finished = true;
    }
    if(parameter4=="error"){
        error = true;
    }
    console.log(score);
    console.log(parameter1);
    if(score==test.score && completed==test.completed && finished==test.finished && error == false){
        document.getElementById("score-result").innerHTML+=
            "<tr>"+
            "<td>"+score+","+completed+","+finished+","+error+"</td>"+
            "<td>"+test.score+","+test.completed+","+test.finished+"</td>"+
            "<td>"+score+","+completed+","+finished+","+error+"</td>"+
            "<td>"+"PASS"+"</td>"+
            "</tr>";
    }
    else if(error==true){
        document.getElementById("score-result").innerHTML+=
            "<tr>"+
            "<td>"+score+","+completed+","+finished+","+error+"</td>"+
            "<td>"+test.errorMessages+"</td>"+
            "<td>"+test.errorMessages+"</td>"+
            "<td>"+"PASS"+"</td>"+
            "</tr>";
    }
    else{
        document.getElementById("score-result").innerHTML+=
            "<tr>"+
            "<td>"+score+","+completed+","+finished+","+error+"</td>"+
            "<td>"+test.score+","+test.completed+","+test.finished+"</td>"+
            "<td>"+score+","+completed+","+finished+","+error+"</td>"+
            "<td>"+"FAIL"+"</td>"+
            "</tr>";
    }

    console.log(error);

}

async function test_Leaderboard(parameter1,parameter2,parameter3) {

    const reply = await fetch(TH_LEADERBOARD_URL+"?size="+parameter1+"&"+parameter2+"&"+parameter3);
    const test = await reply.json();

    // On console
    console.log("API request");
    console.log(TH_LEADERBOARD_URL+"?size="+parameter1+"&"+parameter2+"&"+parameter3);
    console.log("Score API:");
    console.log(test);
    let size = parameter1;
    if(parameter1=="" || parameter1<0 || parameter1 > parameter1.MAX_SAFE_INTEGER){
        size=42;
    }
    let sorted = false;
    let hasPrize = false;
    if(parameter2=="sorted"){
        sorted = true
    }
    if(parameter3=="hasPrize"){
        hasPrize = true;
    }
    console.log(size);
    console.log(sorted);
    console.log(hasPrize);
    if(size==test.numOfPlayers && sorted==test.sorted && hasPrize==test.hasPrize){
        document.getElementById("leaderboard-result").innerHTML+=
            "<tr>"+
            "<td>"+parameter1+","+parameter2+","+parameter3+"</td>"+
            "<td>"+test.numOfPlayers+","+test.sorted+","+test.hasPrize+"</td>"+
            "<td>"+size+","+sorted+","+hasPrize+"</td>"+
            "<td>"+"PASS"+"</td>"+
            "</tr>";
    }
    else {
        document.getElementById("leaderboard-result").innerHTML +=
            "<tr>" +
            "<td>" + parameter1 + "," + parameter2 + "," + parameter3 + "</td>" +
            "<td>" + test.numOfPlayers + "," + test.sorted + "," + test.hasPrize + "</td>" +
            "<td>" + size + "," + sorted + "," + hasPrize + "</td>" +
            "<td>" + "FAIL" + "</td>" +
            "</tr>";
    }
}
