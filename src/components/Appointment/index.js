import "./styles.scss"
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import React from 'react'
import useVisualMode from "../../hooks/useVisualMode.js"
import Form from "./Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


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
{mode === CREATE &&   <Form
  interviewers={[]}
  onSave={("onSave")}
  onCancel={onCancel}
/>}


    </article>
  )
}
