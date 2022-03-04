

// Get the current question from the server
async function get_Question() {
    // a loder animetion *not implemented yet

    let sessionID = getCookie(COOKIE_SESSION_ID);

    const reply = await fetch(TH_QUESTION_URL +"?session="+sessionID);
    const question_obj = await reply.json();

    document.getElementById("testingQNA").innerText=JSON.stringify(question_obj);

    document.getElementById("mainContent").style.display="block";



}
