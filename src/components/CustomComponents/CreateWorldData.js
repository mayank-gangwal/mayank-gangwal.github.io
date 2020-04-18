import React, { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { cardTitle } from "assets/jss/material-kit-react.js";

import Muted from "components/Typography/Muted.js";
import Typography from "@material-ui/core/Typography";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import stylesComp from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  ...imagesStyles,
  ...stylesComp,
  cardTitle
}));

export default function CreateWorldData() {
  const classes = useStyles();

  const [value, setValue] = useState([]);

  useEffect(() => {
    let config = {
      headers: {
        "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
        "x-rapidapi-key": "36584a6d73msh64de65f76aa6f01p10cddajsnbedfe6459110"
      }
    };
    setTimeout(function() {
      axios
        .get(
          `https://corona-virus-world-and-india-data.p.rapidapi.com/api`,
          config
        )
        .then(res => {
          setValue(res.data);
        });
    }, 6000); // API call after 3 sec because rapidAPI doesn't allow more than 1 call within a sec
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  return (
    <React.Fragment>
      <span>
        <h3>World Total:</h3>
        <div />
        <div className={classes.root} style={{ margin: "35px" }}>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  Total cases:{" "}
                  {value.world_total && value.world_total.total_cases}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  Total Deaths:{" "}
                  {value.world_total && value.world_total.total_deaths}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  Total Recovered:{" "}
                  {value.world_total && value.world_total.total_recovered}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  New Cases: {value.world_total && value.world_total.new_cases}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  New Deaths:{" "}
                  {value.world_total && value.world_total.new_deaths}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Muted>
                Last updated: <br /> {value.statistic_taken_at}
              </Muted>
            </Grid>
          </Grid>
        </div>
      </span>

      {/* ============ card starts here =============== */}

      {value &&
        value.countries_stat &&
        value.countries_stat.length > 0 &&
        value.countries_stat.map(record => (
          <div
            key={record.country_name}
            style={{ display: "inline-block", margin: "1rem" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <Card className={classes.textCenter} style={{ width: "18rem" }}>
                  <CardHeader className={classes.textCenter} color="info">
                    {record && record.country_name}
                  </CardHeader>
                  <CardBody>
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      Total Cases:
                    </h4>
                    <span> {record && record.cases}</span> <br />
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      Deaths:
                    </h4>
                    <span> {record && record.deaths}</span> <br />
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      Total Recovered:
                    </h4>
                    <span> {record && record.total_recovered}</span> <br />
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      New Deaths:
                    </h4>
                    <span> {record && record.new_deaths}</span> <br />
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      New Cases:
                    </h4>
                    <span> {record && record.new_cases}</span> <br />
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      Serious Critical:
                    </h4>
                    <span> {record && record.serious_critical}</span> <br />
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      Active Cases:
                    </h4>
                    <span> {record && record.active_cases}</span> <br />
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      Total Cases:
                    </h4>
                    <span> {record && record.cases}</span> <br />
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      Total Cases:
                    </h4>
                    <span> {record && record.cases}</span> <br />
                    <h4
                      style={{ display: "inline-block" }}
                      className={classes.cardTitle}
                    >
                      Total Cases:
                    </h4>
                    <span> {record && record.cases}</span> <br />
                  </CardBody>
                  <CardFooter className={classes.textMuted}>
                    Cases per million population:{" "}
                    {record && record.total_cases_per_1m_population} <br />
                    Deaths per million population:{" "}
                    {record && record.deaths_per_1m_population}
                  </CardFooter>
                </Card>
              </Grid>
            </Grid>
          </div>
        ))}

      {/* ============ card ends here =============== */}
    </React.Fragment>
  );
}
