import "./styles.scss"
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Status from "./Status.js"
import React from 'react'
import useVisualMode from "../../hooks/useVisualMode.js"
import Form from "./Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";





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


  return (
    <article className="appointment">


      <Header time={props.time}>
      </Header>

      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={onSave}
        onCancel={onCancel}
      />}

      {mode === SAVING && <Status message="Saving"/>}


    </article>
  )
}
