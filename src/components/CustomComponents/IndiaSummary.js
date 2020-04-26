import React, { useState, useEffect } from "react";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Graph from "components/CustomComponents/Graph.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import stylesComp from "assets/jss/material-kit-react/views/components.js";

import { Environment } from "../../config.js";

const styles = {
  ...imagesStyles,
  ...stylesComp,
  cardTitle
};

const useStyles = makeStyles(styles);

export default function IndiaSummary(props) {
  const classes = useStyles();

  const [value, setValue] = useState([]);
  const [graphValue, setGraphValue] = useState([]);

  useEffect(() => {
    const headers = Environment.apiConfig;
    axios
      .get(
        `https://corona-virus-world-and-india-data.p.rapidapi.com/api_india_timeline`,
        headers
      )
      .then(res => {
        setGraphValue(JSON.stringify(res.data));
        setValue(JSON.stringify(res.data.pop())); //needed to stringify object before setting value.
      });
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  let record = value.length >= 1 ? JSON.parse(value) : [];

  return (
    <Card>
      <CardHeader className={classes.textCenter} color="info">
        INDIA
      </CardHeader>
      <CardBody>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper style={{ padding: "35px" }} className={classes.paper}>
              <h4
                style={{ display: "inline-block" }}
                className={classes.cardTitle}
              >
                Cases:
              </h4>
              <span> {record.totalconfirmed}</span> <br />
              <h4
                style={{ display: "inline-block" }}
                className={classes.cardTitle}
              >
                Deaths:
              </h4>
              <span> {record.totaldeceased}</span> <br />
              <h4
                style={{ display: "inline-block" }}
                className={classes.cardTitle}
              >
                Recovered:
              </h4>
              <span> {record.totalrecovered}</span> <br />
              <h4
                style={{ display: "inline-block" }}
                className={classes.cardTitle}
              >
                Active:
              </h4>
              <span>
                {" "}
                {record.totalconfirmed > 0 &&
                  parseInt(record.totalconfirmed) -
                    (parseInt(record.totaldeceased) +
                      parseInt(record.totalrecovered))}
              </span>
              <br />
              <h4
                style={{ display: "inline-block" }}
                className={classes.cardTitle}
              >
                New Deaths:
              </h4>
              <span> {record.dailydeceased}</span> <br />
              <h4
                style={{ display: "inline-block" }}
                className={classes.cardTitle}
              >
                New Cases:
              </h4>
              <span> {record.dailyconfirmed}</span> <br />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper style={{ padding: "35px" }} className={classes.paper}>
              {graphValue &&
                graphValue.length > 1 && <Graph data={graphValue} />}
            </Paper>
          </Grid>
        </Grid>
      </CardBody>
      <CardFooter className={classes.textMuted}>
        Last updated: {record.date}
      </CardFooter>
    </Card>
  );
}
