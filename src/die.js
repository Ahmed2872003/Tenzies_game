import React from "react";

export default function die(props) {
  const style = {
    backgroundColor: props.selected ? "#4fe085" : "white",
  };
  return (
    <p style={style} onClick={props.makeSelect}>
      {props.value}
    </p>
  );
}
