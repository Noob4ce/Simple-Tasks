import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config.js";
import firebase from "firebase/app";
import "firebase/firestore";
import "../style/AddTaskBox.scss";

import styles from "../style/TaskList.module.scss";
import RadioBtnUnchecked from "../assets/radio_button_unchecked.svg";
import RadioBtnChecked from "../assets/radio_button_check.svg";
import bulbUnfilled from "../assets/lightbulb_NOFILL.svg";
import bulbFilled from "../assets/lightbulb_FILL.svg";
import addIcon from "../assets/add_FILL0_wght300.svg";



export default function AddTaskBox() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2022-01-01T01:00");
  const [isImportant, setIsImportant] = useState(false);
  const isComplete = false;

  const [showDate, setShowDate] = useState(false);

  const handleSubmit = async (e) => {

    const doc = { title, date, isImportant, isComplete };

    try {
      projectFirestore.collection("tasks").add(doc);
    } catch (err) {
      console.log(err);
    }

    resetBox();
  };

  const resetBox = () => {
    setTitle("");
    setDate("");
    setIsImportant(false);
  };

  return (
    <form className={"container-sm " } id="task-box" onSubmit={handleSubmit}>
      <div className={"row  " + styles.card} id="task-box-card">
        <img className={"col-1 " + styles.taskIcon} src={addIcon} onClick={() => handleSubmit()} />
        <div className="col-5">
        
          <div className="row ">
            <input
              type="text"
              placeholder="Add New Task Here"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={"form-control-sm " + styles.textBox}
            />
          </div>
          <div className="row">
            <input
              type="datetime-local"
              className={"form-control-sm col-4-md mb-2 " + styles.dateForm}
              onChange={(e) => setDate(e.target.value)}
              value={date}

            />
          </div>
        </div>

        <div className="col"></div>

        {!isImportant && (
          <img
            className={"col-1 " + styles.taskIcon}
            src={bulbUnfilled}
            onClick={() => {
              setIsImportant(true);
              console.log(isImportant);
            }}
          />
        )}

        {isImportant && (
          <img
            className={"col-1 " + styles.taskIcon}
            src={bulbFilled}
            onClick={() => {
              setIsImportant(false);
            }}
          />
        )}
      </div>
    </form>
  );
}
