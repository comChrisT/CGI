// Test API calls
const TH_TEST_URL = "https://codecyprus.org/th/test-api/";
const TH_LIST_URL = TH_TEST_URL+"list";
const TH_START_URL = TH_TEST_URL+"start";
const TH_QUESTION_URL = TH_TEST_URL+"question";
const TH_ANSWER_URL = TH_TEST_URL+"answer";
const TH_SCORE_URL = TH_TEST_URL+"score";
const TH_SKIP_URL = TH_TEST_URL+"skip";


async function test_list(parameter) {

    const reply = await fetch(TH_LIST_URL+"?number-of-ths="+parameter);
    const test = await reply.json();

    // On console
    console.log("List API:");
    console.log(test);

    // for(let i = 0; i < test.treasureHunts.length; i++) {
    //     document.getElementById("list").innerHTML
    //         +="<div>"+test.treasureHunts[i].name+"</div>"
    //         +"<div>"+test.treasureHunts[i].description+"</div>";
    //
    // }


}

async function test_start(parameter) {

    const reply = await fetch(TH_START_URL+"?player="+parameter);
    const test = await reply.json();

    // On console
    console.log("Start API:");
    console.log(test);

}

async function test_Question(para1,para2,para3,para4) {

    const reply = await fetch(TH_START_URL+"?"+para1+"&question-type="+para2+"&"+para3+"&"+para4);
    const test = await reply.json();

    // On console
    console.log("Question API:");
    console.log(test);

}
