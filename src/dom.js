/*
 * Purpose: Assigns a function to a dom element via a specified event
 * domId: Id of the DOM element
 * callType: type of dom element interaction to trigger function call
 * callFunction: function to call
 * argVal: array of parameters for the function to call
 */
function domFunctionCaller(domName, callType, callFunction, argVal) {
    const dom = document.querySelector(domName);
    dom.addEventListener(callType, () => callFunction(argVal));
}

/* Purpose: Gets information from a form and stores it in a variable and clears the form
 * arg: Array with first element as the id of the form, and the second element as the variable to store the information in the form
 */
function formGetter(id){
    const form = document.querySelector(id);
    var store = form.value;
    form.value = "";
    mainLibrary.addTopic(topic(store));
    displayer.topicDisplay(mainLibrary);
}



export { formGetter, domFunctionCaller } 
