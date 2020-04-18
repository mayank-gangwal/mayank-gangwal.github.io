import React, { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Badge from "@material-ui/core/Badge";
import Warning from "components/Typography/Warning.js";

import { makeStyles } from "@material-ui/core/styles";

import { cardTitle } from "assets/jss/material-kit-react.js";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Muted from "components/Typography/Muted.js";
import Typography from "@material-ui/core/Typography";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import stylesComp from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    color: "#00acc1"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15)
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

export default function CreateIndianStateData() {
  const classes = useStyles();

  const [value, setValue] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
          `https://corona-virus-world-and-india-data.p.rapidapi.com/api_india`,
          config
        )
        .then(res => {
          setValue(res.data);
        });
    }, 2000); // API call after 3 sec because rapidAPI doesn't allow more than 1 call within a sec
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  return (
    <React.Fragment>
      <span>
        <h3>Indian summary:</h3>
        <div />
        <div className={classes.root} style={{ margin: "35px" }}>
          <Grid container spacing={4}>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  Total cases:{" "}
                  {value.total_values && value.total_values.confirmed}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  Total Deaths:{" "}
                  {value.total_values && value.total_values.deaths}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  Total Recovered:{" "}
                  {value.total_values && value.total_values.recovered}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  New Cases:{" "}
                  {value.total_values && value.total_values.deltaconfirmed}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Typography variant="caption" display="block" gutterBottom>
                  New Deaths:{" "}
                  {value.total_values && value.total_values.deltadeaths}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Muted>
                Last updated: <br />{" "}
                {value &&
                  value.total_values &&
                  value.total_values.lastupdatedtime}
              </Muted>
            </Grid>
          </Grid>
        </div>
      </span>

      {/* ============ accordian starts here =============== */}

      {value &&
        value.state_wise &&
        Object.keys(value.state_wise).map(record => {
          return (
            <div key={record}>
              <div className={classes.root}>
                <ExpansionPanel
                  expanded={expanded === record}
                  onChange={handleChange(record)}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={record + "bh-content"}
                    id={record + "bh-header"}
                  >
                    <Typography className={classes.heading}>
                      {record}
                    </Typography>
                    <Button className={classes.secondaryHeading}>
                      Confirmed: {value.state_wise[record].confirmed}
                    </Button>
                    <Button
                      color="primary"
                      className={classes.secondaryHeading}
                    >
                      Recovered: {value.state_wise[record].recovered}
                    </Button>
                    <Button
                      color="secondary"
                      className={classes.secondaryHeading}
                    >
                      Deaths: {value.state_wise[record].deaths}
                    </Button>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container spacing={4}>
                      <Grid item xs={3}>
                        <Paper className={classes.paper}>
                          <Warning>{record} summary</Warning>
                        </Paper>
                        <Paper
                          className={classes.paper}
                          style={{ textAlign: "left", color: "#3f51b5" }}
                        >
                          <h4>
                            Active cases:
                            <small>{value.state_wise[record].active}</small>
                          </h4>
                          <h4>
                            New cases:{" "}
                            <small>
                              {value.state_wise[record].deltaconfirmed}
                            </small>
                          </h4>
                          <h4>
                            New deaths:{" "}
                            <small>
                              {value.state_wise[record].deltadeaths}
                            </small>
                          </h4>
                          <h4>
                            New recovered{" "}
                            <small>
                              {value.state_wise[record].deltarecovered}
                            </small>
                          </h4>
                          <h5>
                            {" "}
                            Last updated:{" "}
                            <small>
                              {value.state_wise[record].lastupdatedtime}{" "}
                            </small>{" "}
                          </h5>
                        </Paper>
                      </Grid>

                      {/* ============== district info starts =============== */}

                      <Grid item xs={9}>
                        <Paper className={classes.paper}>
                          <Warning>
                            Number of cases confirmed - District wise
                            bifurcation
                          </Warning>
                        </Paper>

                        <Paper className={classes.paper}>
                          {value &&
                            value.state_wise &&
                            value.state_wise[record] &&
                            value.state_wise[record].district &&
                            Object.keys(
                              value.state_wise[record].district
                            ).map(district_wise => {
                              return (
                                <span
                                  key={district_wise}
                                  style={{
                                    margin: "10px",
                                    display: "inline-block"
                                  }}
                                >
                                  <Badge
                                    max={9999}
                                    badgeContent={
                                      value.state_wise[record].district[
                                        district_wise
                                      ].confirmed
                                    }
                                    color="primary"
                                  >
                                    <Button variant="outlined" color="primary">
                                      {district_wise}
                                    </Button>
                                  </Badge>
                                </span>
                              );
                            })}
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* ============== district info ends =============== */}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          );
        })}
      {/* ============ accordian ends here =============== */}
    </React.Fragment>
  );
}
