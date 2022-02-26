function handleTestList(caller) {
    get_List(caller, true);
}

function handleTestStart(caller) {
    let params = { "player": "INACTIVE" }; // explicitly request an error
    handleStart(params, caller, true);
}