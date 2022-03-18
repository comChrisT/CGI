// Test API calls
const TH_TEST_URL = "https://codecyprus.org/th/test-api/";
const TH_LIST_URL = TH_TEST_URL+"list";
const TH_START_URL = TH_TEST_URL+"start";
const TH_QUESTION_URL = TH_TEST_URL+"question";
const TH_ANSWER_URL = TH_TEST_URL+"answer";
const TH_SCORE_URL = TH_TEST_URL+"score";
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
                "<td class='output-td'>"+test.treasureHunts[i].name+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].description+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].ownerEmail+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].secretCode+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].salt+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].visibility+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].startsOn+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].endsOn+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].maxDuration+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].shuffled+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].requiresAuthentication+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].emailResults+"</td>"+
                "<td class='output-td'>"+test.treasureHunts[i].hasPrize+"</td>"+
                "</tr>";
     }


}

async function test_start(parameter) {

    const reply = await fetch(TH_START_URL+"?player="+parameter);
    const test = await reply.json();

    // On console
    console.log("API request");
    console.log(TH_START_URL+"?player="+parameter);
    console.log("Start API:");
    console.log(test);
   if(test.status!="OK"){
    document.getElementById("test-output").innerHTML+=
    "<p>"+test.errorMessages+"</p>";
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

}

async function test_Answer(parameter1,parameter2,parameter3) {

    const reply = await fetch(TH_ANSWER_URL+"?"+parameter1+"&"+parameter2+"&"+parameter3);
    const test = await reply.json();

    // On console
    console.log("API request");
    console.log(TH_ANSWER_URL+"?"+parameter1+"&"+parameter2+"&"+parameter3);
    console.log("Answer API:");
    console.log(test);

}

async function test_Score(parameter1,parameter2,parameter3,parameter4) {

    const reply = await fetch(TH_SCORE_URL+"?score="+parameter1+"&"+parameter2+"&"+parameter3+"&"+parameter4);
    const test = await reply.json();

    // On console
    console.log("API request");
    console.log(TH_SCORE_URL+"?score="+parameter1+"&"+parameter2+"&"+parameter3+"&"+parameter4);
    console.log("Score API:");
    console.log(test);

}

async function test_Leaderboard(parameter1,parameter2,parameter3) {

    const reply = await fetch(TH_LEADERBOARD_URL+"?size="+parameter1+"&"+parameter2+"&"+parameter3);
    const test = await reply.json();

    // On console
    console.log("API request");
    console.log(TH_LEADERBOARD_URL+"?size="+parameter1+"&"+parameter2+"&"+parameter3);
    console.log("Score API:");
    console.log(test);

}
