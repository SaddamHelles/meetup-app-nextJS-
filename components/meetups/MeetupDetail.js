import classes from "./MeetupDetail.module.css";
import React, { Fragment } from "react";

const MeetupDetail = (props) => {
  return (
    <Fragment>
      <section key={props.id} className={classes.details}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </Fragment>
  );
};

export default MeetupDetail;
