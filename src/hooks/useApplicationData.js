import { useReducer, useEffect } from "react";
import axios from "axios"

const SET_DAY = "SET_DAY"
const SET_DAYS = "SET_DAYS"
const SET_APPOINTMENTS = "SET_APPOINTMENTS"
const SET_INTERVIEWERS = "SET_INTERVIEWERS"
const SET_SPOTS = "SET_SPOTS"

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value }
    case SET_DAYS:
      return { ...state, days: action.value }
    case SET_INTERVIEWERS: {
      return { ...state, interviewers: action.value }
    }
    case SET_APPOINTMENTS: {
      return { ...state, appointments: action.value }
    }
    case SET_SPOTS: {
      return { ...state, days: action.value }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }

}

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
      setAppointments(all[1].data);
      setInterviewers(all[2].data)

    })

  }, [])

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setAppointments(appointments)
        axios.get("http://localhost:8001/api/days").then(res => setDays(res.data))
      })
  }

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

