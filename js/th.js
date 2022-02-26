const TH_BASE_URL = "https://codecyprus.org/th/api/"; // the true API base url
const TH_TEST_URL = "https://codecyprus.org/th/test-api/"; // the test API base url

/**
 * An asynchronous function to realize the functionality of getting the available 'treasure hunts' (using /list) and
 * processing the result to update the HTML with a bullet list with the treasure hunt names and descriptions. Also,
 * for each treasure hunt in the bullet list, a link is shown to trigger another function, the 'select'.
 * @return {Promise<void>}
 */

// testing
async function List(){
    let cha_List = document.getElementById("options");

    let cha_uuid;
    let cha_name;
    fetch(TH_BASE_URL + "list")
        .then(response => response.json()) //Parse JSON text to JavaScript object
        .then(jsonObject => {
            for(var i=0; i<jsonObject.treasureHunts.length; i++){

                cha_uuid=jsonObject.treasureHunts[i].uuid;
                cha_name=jsonObject.treasureHunts[i].name;

                // listItem.innerHTML = "<a href='https://codecyprus.org/th/api/start?player=Guowei&app=Team2App&treasure-hunt-id="+Refuuid+"'>" + jsonObject.treasureHunts[i].name + "</a>";
                cha_List+=
                    "<li>"
                    +"<a href='https://codecyprus.org/th/api/start?player=Guowei&app=Team2App&treasure-hunt-id="+cha_uuid+"'>" + cha_name + "</a>"
                    +"</li>";

                //listItem.innerHTML = "<a href='register.html?uuid="+cuuid+"&cname='>" + jsonObject.treasureHunts[i].name + "</a>";
                //cha_List.appendChild(listItem);
            }
        });


}


async function get_List() {

    // call the web service and await for the reply to come back and be converted to JSON
    const reply = await fetch(TH_BASE_URL + "list");
    const json = await reply.json();

    // identify the spinner, if available, using the id 'loader'...
    //let spinner = document.getElementById("loader");
    // .. and stop it (by hiding it)
    //spinner.hidden = true;

    let treasureHuntsArray = json.treasureHunts;
    let chaList = "<ul class='listCha'>"; // dynamically form the HTML code to display the list of treasure hunts
    for(let i = 0; i < treasureHuntsArray.length; i++) {
        chaList += "<li>"
                +  "<a href='register.html?uuid="+treasureHuntsArray[i].uuid+"&name="+treasureHuntsArray[i].name+"'>"+treasureHuntsArray[i].name+"</a>"
                +  "</li>";
    }
    chaList += "</ul>";
    // update the DOM with the newly created list
    document.getElementById("options").innerHTML = chaList;

}
// pass data from url
console.log(location.search);




/**
 * This function is called when a particular treasure hunt is selected. This is merely a placeholder as you're expected
 * to realize this function-or an equivalent-to perform the necessary actions after a treasure hunt is selected.
 *
 * @param uuid this is the argument that corresponds to the UUID of the selected treasure hunt.
 * @return {Promise<void>}
 */
async function select(uuid) {
    // For now just print the selected treasure hunt's UUID. Normally, you're expected to guide the user in entering
    // their name etc. and proceed to calling the '/start' command of the API to start a new session.
    console.log("Selected treasure hunt with UUID: " + uuid);
    // todo add your own code ...
}
