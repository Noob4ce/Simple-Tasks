import React, { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config.js";
import firebase from "firebase/app";
import "firebase/firestore";

import AddTaskForm from "./AddTaskForm";
import Modal from "./Modal";

import styles from "../style/TaskList.module.scss";
import RadioBtnUnchecked from "../assets/radio_button_unchecked.svg";
import RadioBtnChecked from "../assets/radio_button_check.svg";
import bulbUnfilled from "../assets/lightbulb_NOFILL.svg";
import bulbFilled from "../assets/lightbulb_FILL.svg";

export default function EventList({ tasks, handleClick }) {
  const [showModal, setModal] = useState(false);
  const [editTask, setEditTask] = useState("hh");
  const handleClose = (input) => {
    setModal(input);
  };

  const handleIsImportant = async (id, state) => {
    try {
      state
        ? projectFirestore.collection("tasks").doc(id).update({
            isImportant: false,
          })
        : projectFirestore.collection("tasks").doc(id).update({
            isImportant: true,
          });
    } catch (err) {
      console.log(err);
    }
  };

  const handleIsComplete = async (id, state) => {
    try {
      state
        ? projectFirestore.collection("tasks").doc(id).update({
            isComplete: false,
          })
        : projectFirestore.collection("tasks").doc(id).update({
            isComplete: true,
          });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      {tasks.map((task) => (
        <div className={"row " + styles.card} key={task.id}>
          {task.isComplete && (
            <img
              className={"col-1 " + styles.taskIcon}
              src={RadioBtnChecked}
              onClick={() => handleIsComplete(task.id, true)}
            />
          )}
          {!task.isComplete && (
            <img
              className={"col-1 " + styles.taskIcon}
              src={RadioBtnUnchecked}
              onClick={() => handleIsComplete(task.id, false)}
            />
          )}

          <div
            className="col-6"
            onClick={() => {
              setEditTask(task.id);
              handleClose(true);
            }}
          >
            {task.isComplete && (
              <p className="row text-decoration-line-through">{task.title}</p>
            )}

            {task.isComplete && (
              <p className="row text-decoration-line-through">
                {task.date.replace("T", " ")}
              </p>
            )}

            {!task.isComplete && !task.isImportant && (
              <p className="row ">{task.title}</p>
            )}

            {!task.isComplete && !task.isImportant && (
              <p className="row">{task.date.replace("T", " ")}</p>
            )}

            {task.isImportant && !task.isComplete && (
              <p className="row text-danger">{task.title}</p>
            )}

            {task.isImportant && !task.isComplete && (
              <p className="row text-danger">{task.date.replace("T", " ")}</p>
            )}
          </div>

          <div className="col"></div>

          {task.isImportant && (
            <img
              className={"col-1 " + styles.taskIcon}
              src={bulbFilled}
              onClick={() => handleIsImportant(task.id, true)}
            />
          )}

          {!task.isImportant && (
            <img
              className={"col-1 " + styles.taskIcon}
              src={bulbUnfilled}
              onClick={() => handleIsImportant(task.id, false)}
            />
          )}
        </div>
      ))}
      {showModal && (
        <Modal handleClose={handleClose}>
          <AddTaskForm id={editTask} handleClose={handleClose} />
        </Modal>
      )}
    </div>
  );
}
