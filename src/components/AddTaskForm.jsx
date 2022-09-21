import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config.js";
import firebase from "firebase/app";
import "firebase/firestore";

import "../style/AddTaskForm.scss";

export default function NewEventForm({ id, handleClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isComplete, setIsCompelete] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("tasks")
      .doc(id)
      .onSnapshot((doc) => {
        try {
          if (doc.exists) {
            console.log(doc);
            setIsPending(false);
            setTitle(doc.data().title);
            setDate(doc.data().date);
          } else {
            setIsPending(false);
          }
        } catch (err) {
          setIsPending(false);
          setError(err);
        }
      });

    return () => unsub();
  }, [id]);

  const resetForm = () => {
    setDate("");
    setTitle("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = { title, date, isImportant, isComplete };

    console.log(doc);

    try {
      projectFirestore.collection("tasks").doc(id).update({
        title: title,
        date: date,
        isImportant: isImportant,
        isComplete: isComplete,
      });
    } catch (err) {
      console.log(err);
    }

    resetForm();
    handleClose(false);
  };

  const handleDelete = (id) => {
    projectFirestore.collection("tasks").doc(id).delete();
    handleClose(false);
  };

  return (
    <form className="container-sm new-event-form" onSubmit={handleSubmit}>
      {isPending && (
        <div>
          <h2>loading...</h2>
        </div>
      )}

      {error && (
        <div>
          <h2>{error}</h2>
        </div>
      )}
      {title && (
        <div>
          <label>
            <span>Task Title: </span>
            {
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            }
          </label>

          <label>
            <span>Task Date:</span>
            {
              <input
                type="datetime-local"
                className="mb-3"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            }
          </label>

          <div className="row text-center">
            <button
              className="col-6 btn"
              type="button"
              onClick={() => handleDelete(id)}
            >Delete</button>
            <button className="col-6 btn">Submit</button>
          </div>
        </div>
      )}
    </form>
  );
}
