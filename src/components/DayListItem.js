import React from "react";
import "./DayListItem.scss"
import classnames from "classnames"

export default function DayListItem(props) {

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = (spots) => {
    if (spots === 1) {
      return `${spots} spot remaining `
    }
    if (spots) {
      return `${spots} spots remaining `
    }
    return "no spots remaining"
  }

  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}