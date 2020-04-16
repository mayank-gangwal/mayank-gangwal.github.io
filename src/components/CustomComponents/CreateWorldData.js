import React, { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import Muted from "components/Typography/Muted.js";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function CreateWorldData() {
  const classes = useStyles();

  const [value, setValue] = useState([]);
  //const record = value;

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
          setValue(res.data); //needed to stringify object before setting value.
        });
    }, 3000); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour
  }, []);

  //console.log("---> " + value.countries_stat);

  return (
    <React.Fragment>
      <span>
        <h3>World Total:</h3>
        <div />
        <div className={classes.root}>
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
      {value.countries_stat &&
        value.countries_stat.length > 0 &&
        value.countries_stat.map(record => (
          <div key={record.country_name}>
            {record.country_name} -- CASES: {record.cases} -- DEATHS:{record.deaths}{" "}
            -- REGION: {record.region} -- TOTAL RECOVERED:{" "}
            {record.total_recovered} -- NEW DEATHS: {record.new_deaths} -- NEW
            CASES: {record.new_cases} -- SERIOUS CRITICAL:{" "}
            {record.serious_critical} : {record.active_cases} :{" "}
            {record.total_cases_per_1m_population}
          </div>
        ))}
      {value &&
        value.countries_stat &&
        value.countries_stat.length > 0 &&
        console.log(value.countries_stat)}
      {/* ===============card starts here================= */}

      {/* ============ card ends here =============== */}
    </React.Fragment>
  );
}
