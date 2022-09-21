import React, { useState,useEffect } from "react";
import { projectFirestore } from './firebase/config.js';

import Title from "./components/Title";
import TaskList from "./components/TaskList";
import AddTaskBox from "./components/AddTaskBox"


function App() {
  const [showModal, setModal] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [events, setEvents] = useState([]);

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);



  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('tasks').onSnapshot((snapshot) => {
      if(snapshot.empty){
        setError('No Tasks');
        setIsPending(false);
      } else{
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() });
        })

        setData(results);
        setIsPending(false);
      }
    }, (err) => {
      setError(err.message);
      setIsPending(false);
    })

    return () => unsub();

  }, [])

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => {
      return [...prevEvents, newEvent]
    })
    setModal(false);

  }

  const handleClick = (id) => {
    setEvents((prevEvents) => {
      return prevEvents.filter((event) => {
        return id !== event.id;
      });
    });
  };

  const handleClose = (input) => {
    setModal(input);
  }

  return (
    <div className="App text-center container">
      <Title title="Simple Tasks" />

      {isPending && <div><h2>loading...</h2></div>}

      {error && <div><h2>{error}</h2></div>}

      {/* {showEvents && (
        <div>
          <button onClick={() => setShowEvents(false)}>Hide</button>
        </div>
      )}
      {!showEvents && (
        <div>
          <button onClick={() => setShowEvents(true)}>Show</button>
        </div>
      )} */}
      {data && <TaskList tasks = {data} handleClick={handleClick}></TaskList>}

        {/* <button onClick={() => handleClose(true)}>Add New Event</button>

      {showModal && <Modal handleClose={handleClose}>
        <AddTaskForm addEvent={addEvent} />
      </Modal>} */}

      <AddTaskBox/>



    </div>
    
  );
}

export default App;
