import { library, topic, todo } from './library.js'
//import topic from './topic.js'
//import todo from './todo.js'
import { displayer } from './display.js'
import { domFunctionCaller } from './dom.js'

var mainLibrary;
    //define library and the default topic
    mainLibrary = library();
    const maintasks = topic("Main Tasks");

    const maintodo = todo("Do something productive!");
    maintasks.addTodo(maintodo);
    mainLibrary.addTopic(maintasks);
    localStorage.setItem("librarys", JSON.stringify(mainLibrary));


displayer.topicDisplay(mainLibrary);


