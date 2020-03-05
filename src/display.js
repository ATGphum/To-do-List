import { domFunctionCaller } from './dom.js'
import { library, topic, todo } from './library.js'

const displayer = (() => {

    //library: an object containing all the topics
    const topicDisplay = (library) => {
        var libArray = Object.values(library.getTopics());
        const sideBar = document.querySelector('#sidebar');
        //clear the sidebar
        sideBar.innerHTML = "";
        //append all of the topic names to the sidebar
        for(var x = 0; x < libArray.length; x++){
            const topic = document.createElement("div");
            topic.textContent = libArray[x].getTitle();
            topic.classList.add("topic");
            topic.id = libArray[x].getTitle();
            topic.addEventListener('click', (e) => {
                const topics = document.querySelectorAll(".topic");
                topics.forEach(tempTopic => tempTopic.classList.remove("selectedtopic"));
                todoDisplay(e.srcElement.innerText, library);
                topic.classList.add("selectedtopic");
            });
            sideBar.appendChild(topic);
        }
        //add new topics on click
        domFunctionCaller("#addTopic", "click", formGetter, "#topicInput");
        function formGetter(id){
            const form = document.querySelector(id);
            //check to see if a name has been entered
            if(form.value != ""){
                var store = form.value;
                form.value = "";
                library.addTopic(topic(store));
                displayer.topicDisplay(library);
            }
        }
    }

    //toDoName: the id of the topic to display its contents
    //library: the variable array storing all topics
    const todoDisplay = (topicName, library) => {
        //get the topic object from the library
        var currTopic = library.getTopics()[topicName];
        var topicArray = Object.values(currTopic.getTodos());
        const mainScreen = document.querySelector('#mainscreen');
        //clear the screen and add title and make a button to remove the given topic
        mainScreen.innerHTML = "<p id=mainscreentitle>" + topicName + "</p>"; 
        mainScreen.innerHTML += "<button id=removeTopic>x</button>";
        domFunctionCaller("#removeTopic", "click", library.removeTopic, topicName);
        domFunctionCaller("#removeTopic", "click", topicDisplay, library);
        domFunctionCaller("#removeTopic", "click", (empty) => empty.innerHTML = "", mainScreen);
        for(var x = 0; x < topicArray.length; x++){
            const todo = document.createElement("div");
            todo.textContent = topicArray[x].getTitle();
            todo.classList.add("todo");
            todo.id = topicArray[x].getTitle();
            todo.addEventListener("click", (e) => todoDetailDisplayer(e.srcElement.innerText, topicName, library));
            mainScreen.append(todo);
            //check if task is completed and slash through if so
            if(topicArray[x].iscompleted()){
                todo.classList.add("completedtask");
            }
        }
        //add the form to add todos to the topic, and give it its functionality
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = "<div><form id=todoForm onsubmit='return false'><input id=todoInput type='text' placeholder='Enter new task here'></form><button id='addTodo'>Add Task</button></div>";
        mainScreen.appendChild(tempDiv);
        //add new todos on click
        domFunctionCaller("#addTodo", "click", formGetter, "#todoInput");

        function formGetter(id){
        const form = document.querySelector(id);
        var store = form.value;
        if(form.value != ""){
            console.log(form.value);
            form.value = "";
            currTopic.addTodo(todo(store));
            //refresh the page
            displayer.todoDisplay(topicName, library);
        }
        }
    }

    const todoDetailDisplayer = (todoName, topicName, library) => {
        //get toDo object from library 
        var topic = library.getTopics()[topicName];
        var toDo = topic.getTodos()[todoName];
        const screen = document.querySelector("#rightscreen");  
        //show the todoname on the right screen
        screen.innerHTML = "<p id=rightscreentitle>" + todoName + "</p>";       
        screen.innerHTML += "<button id=removeTodo>x</button>";
        domFunctionCaller("#removeTodo", "click", topic.removeTodo, todoName);
        document.querySelector("#removeTodo").addEventListener("click", () => todoDisplay(topicName, library));
        domFunctionCaller("#removeTodo", "click", (empty) => empty.innerHTML = "", screen);

        const descriptionBox = document.createElement("div");
        descriptionBox.id = "descriptionBox"
        const description = document.createElement("p");
        description.textContent = "Description";
        descriptionBox.appendChild(description);
        descriptionBox.innerHTML += "<textarea id=descriptionForm cols='40' rows='5'></textarea>"
        screen.appendChild(descriptionBox);
        //update contents of description as the form is updated
        const form = document.querySelector("#descriptionForm")
        form.value = toDo.getDescription();
        form.addEventListener("keydown", () => toDo.changeDescription(form.value));
        const notesBox = document.createElement("div");
        notesBox.id = "notesBox"
        const notes = document.createElement("p");
        notes.textContent = "Notes";
        notesBox.appendChild(notes);
        notesBox.innerHTML += "<textarea id=notesForm cols='40' rows='5'></textarea>";
        screen.appendChild(notesBox);
        //update contents of notes as the form is updated
        const notesform = document.querySelector("#notesForm")
        notesform.value = toDo.getNotes();
        notesform.addEventListener("keydown", () => toDo.changeNotes(notesform.value));

        //add completed button
        const completed = document.createElement("button");
        completed.textContent = "Completed Task";
        completed.id = "completed";
        completed.addEventListener("click", () => {
            toDo.complete();
            todoDisplay(topicName, library);
        });
        screen.appendChild(completed);

    }
         
    return { topicDisplay, todoDisplay };
})();

export { displayer }
