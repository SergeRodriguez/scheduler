import "./styles.scss"
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import Status from "./Status.js"
import Confirm from "./Confirm.js"
import Error from "./Error.js"


import React from 'react'
import useVisualMode from "../../hooks/useVisualMode.js"
import Form from "./Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE"
const ERROR_SAVE = "ERROR_SAVE"

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
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  }

  function onDelete() {
    transition(CONFIRM)

  }

  function onConfirm() {

    transition(DELETE, true)
    props.onDelete(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }

  function onEdit() {
    transition(EDIT)
  }

  return (
    <article data-testid="appointment" className="appointment">


      <Header time={props.time}>
      </Header>

      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
          id={props.id}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={onSave}
        onCancel={onCancel}
      />}

      {mode === EDIT && <Form
        interviewers={props.interviewers}
        onSave={onSave}
        onCancel={onCancel}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
      />}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      }

      {mode === ERROR_SAVE && <Error
        message="Could not save appoitnment"
        onClose={onCancel}
      />
      }

      {mode === ERROR_DELETE && <Error
        message="Could not delete appoitnment"
        onClose={() => transition(SHOW)}
      />
      }




    </article>
  )
}
