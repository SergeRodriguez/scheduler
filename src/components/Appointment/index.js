import "./styles.scss"
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Status from "./Status.js"
import Confirm from "./Confirm.js"

import React from 'react'
import useVisualMode from "../../hooks/useVisualMode.js"
import Form from "./Form"
import { func } from "prop-types"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";







export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE)
  }

  const onCancel = () => {
    back()
  }

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  function onDelete() {
    transition(CONFIRM)
   
  }

  function onConfirm (){
    transition(DELETE) 
    props.onDelete(props.id)
      .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">


      <Header time={props.time}>
      </Header>

      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          id={props.id}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={onSave}
        onCancel={onCancel}
      />}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm 
      message="Are you sure you would like to delete?"
      onConfirm={onConfirm}
      onCancel={onCancel}
      >

      </Confirm>}


    </article>
  )
}
