//returns all of the appointments(interviews) for a given day
export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(obj => obj.name === day)
  if (filteredDays.length === 0) {
    return []
  }
  const appointmentsArr = filteredDays[0].appointments
  const appointmentsForDay = []
  for (const appointment of appointmentsArr) {
    if (appointment in state.appointments) {
      appointmentsForDay.push(state.appointments[appointment])
    }
  }
  return appointmentsForDay
}

//return an array with all the interviewer objects of interviewrs with appointments for a given day
export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter(obj => obj.name === day)
  if (filteredDays.length === 0) {
    return []
  }
  const interviewersArr = filteredDays[0].interviewers
  const interviewersForDay = []
  for (const interviewer of interviewersArr) {
    if (interviewer in state.interviewers) {
      interviewersForDay.push(state.interviewers[interviewer])
    }
  }
  return interviewersForDay
}


//returns all the specific information of given interview
export function getInterview(state, interview) {
  if (interview && interview.interviewer && String(interview.interviewer) in state.interviewers) {
    return { ...interview, interviewer: state.interviewers[String(interview.interviewer)] }
  }
  return null
}
