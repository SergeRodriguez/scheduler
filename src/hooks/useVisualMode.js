import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode)
    } else {
      setHistory([...history, mode])
      setMode(newMode)
    }
  }

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