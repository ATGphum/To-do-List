const library = () => {
    
    var topics = {};

    const addTopic = (newTopic) => {
        topics[newTopic.getTitle()] = newTopic;
    }

    const removeTopic = (topicName) => {
        delete topics[topicName];
    }

    const getTopics = () => {
        return topics;
    }
    
    return { addTopic, removeTopic, getTopics };
}

const topic = (topicName) => {

    const name = topicName;
    var todos = {};

    const getTitle = () => {
        return topicName;
    }
    
    const addTodo = (newDo) => {
        todos[newDo.getTitle()] = (newDo);
    }

    const removeTodo = (name) => {
        delete todos[name];
    }

    const getTodos = () => {
        return todos;
    }

    return { getTitle, addTodo, removeTodo, getTodos };
}   
  
const todo = (title) => {

    const doTitle = title;
    var description = "";
    var notes = "";
    var iscomplete = false;

    const changeDescription = (Description) => {
        description = Description;
    }

    const changeNotes = (newNotes) => {
        notes = newNotes;
    }

    const getTitle = () => {
        return title;
    }

    const getDescription = () => {
        return description;
    }

    const getNotes = () => {
        return notes;
    }

    const complete = () => {
        iscomplete = true;
    }

    const iscompleted = () => {
        return iscomplete;
    } 

    return { doTitle, changeDescription, getTitle, getDescription, getNotes, changeNotes, complete, iscompleted }
 
} 

export { library, topic, todo }
