import React, { useState, useEffect } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { cardTitle } from "assets/jss/material-kit-react.js";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
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

function createData(district, confirmed_cases) {
  return {
    district,
    confirmed_cases
  };
}

let rows = [
  //   createData("Frozen yoghurt", 159),
  //   createData("Ice cream sandwich", 237),
  //   createData("Eclair", 262),
  //   createData("Cupcake", 305),
  //   createData("Gingerbread", 356)
];

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

  //   useEffect(
  //     () => {
  //       if (value && value.state_wise) {
  //         rows = [
  //           createData(
  //             value.state_wise.Maharashtra.district.Pune,
  //             value.state_wise.Maharashtra.district.Pune.confirmed
  //           )
  //         ];
  //       }

  //       console.log("in here ---> " + value);
  //     },
  //     [value]
  //   );

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
                    <Typography className={classes.secondaryHeading}>
                      Total confirmed: {value.state_wise[record].confirmed}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container spacing={4}>
                      <Grid item xs={3}>
                        <Paper
                          className={classes.paper}
                          style={{ textAlign: "left" }}
                        >
                          Active: {value.state_wise[record].active}
                          <br />
                          Confirmed: {value.state_wise[record].confirmed} <br />
                          Deaths: {value.state_wise[record].deaths} <br />
                          New cases: {
                            value.state_wise[record].deltaconfirmed
                          }{" "}
                          <br />
                          New deaths: {
                            value.state_wise[record].deltadeaths
                          }{" "}
                          <br />
                          New recovered:{" "}
                          {value.state_wise[record].deltarecovered} <br />
                          Total recovered: {
                            value.state_wise[record].recovered
                          }{" "}
                          <br />
                          Last updated:{" "}
                          {value.state_wise[record].lastupdatedtime}
                        </Paper>
                      </Grid>

                      {/* ============== table starts =============== */}

                      <Grid item xs={9}>
                        <Paper className={classes.paper}>
                          {value &&
                            value.state_wise &&
                            value.state_wise[record] &&
                            value.state_wise[record].district &&
                            Object.keys(
                              value.state_wise[record].district
                            ).map(district_wise => {
                              console.log("in here ---> " + { district_wise });
                              return (
                                <span key={district_wise}>
                                  <Button>
                                    {district_wise} :{" "}
                                    {
                                      value.state_wise[record].district[
                                        district_wise
                                      ].confirmed
                                    }
                                  </Button>
                                </span>
                              );
                            })}
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* ============== table ends =============== */}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </div>
          );
        })}

      {/* <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              General settings
            </Typography>
            <Typography className={classes.secondaryHeading}>
              I am an expansion panel
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div> */}

      {/* <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>District</TableCell>
              <TableCell align="right">Confirmed Cases</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => <TableRow key={row.district}>
                <TableCell component="th" scope="row">
                  {row.district}
                </TableCell>
                <TableCell align="right">{row.confirmed_cases}</TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer> */}
      {/* ============ accordian ends here =============== */}
    </React.Fragment>
  );
}
