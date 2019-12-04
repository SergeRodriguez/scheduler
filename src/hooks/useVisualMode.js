import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

// transitions to the new state that was passed as an argument and also adds the it to the history (array)
  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode)
    } else {
      setHistory(prev => ([...prev, mode]))
      setMode(newMode)
    }
  }

// transition to the previous state without any side effects
  function back() {
    if (history.length > 0) {
      setMode(history.slice(-1)[0])
      setHistory(history.slice(0, (history.length - 1)))
    }
  }

  return {
    mode,
    transition,
    back
  };
}