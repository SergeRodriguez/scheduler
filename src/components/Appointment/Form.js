import React, { useState } from 'react'
import Button from "../Button.js"
import InterviewerList from "../InterviewerList.js"

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  // const onSave = () => {
  //   props.onSave(name,interviewer)
  // }

  function onSave() {

    if (name === "") {
      setError("Student name cannot be blank!");
      return;
    }

    if (!interviewer) {
      setError("You must choose an Interviewer!");
      return;
    }

    setError("");
    props.onSave(name, interviewer);
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={"Enter Student Name"}
            value={name}
            onChange={(event) => setName(event.target.value)}

            data-testid="student-name-input"

          /*
            This must be a controlled component
          */
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
        </form>

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}
