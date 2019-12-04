import { useReducer, useEffect } from "react";
import axios from "axios"
import reducer, {
  SET_DAY,
  SET_DAYS,
  SET_APPOINTMENTS,
  SET_INTERVIEWERS
} from "../reducers/application"

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},

  });

  const setDay = day => dispatch({ type: SET_DAY, value: day });
  const setDays = days => dispatch({ type: SET_DAYS, value: days });
  const setAppointments = appointments => dispatch({ type: SET_APPOINTMENTS, value: appointments });
  const setInterviewers = interviewers => dispatch({ type: SET_INTERVIEWERS, value: interviewers });


  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8001/api/days")),
      Promise.resolve(axios.get("http://localhost:8001/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8001/api/interviewers"))

    ]).then((all) => {
      setDays(all[0].data);
      setInterviewers(all[2].data)
      setAppointments(all[1].data);

    })

  }, [])

  // adds interview to database and adds it to the state
  function bookInterview(id, interview) {
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setAppointments(appointments)
        axios.get("http://localhost:8001/api/days").then(res => setDays(res.data))
      })
  }

  // delete interview from database and removes it from the state
  function onDelete(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setAppointments(appointments)
        axios.get("http://localhost:8001/api/days").then(res => setDays(res.data))
      })
  }
  return { state, setDay, bookInterview, onDelete }
}

export default useApplicationData

