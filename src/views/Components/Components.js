import React, { useState, useEffect } from "react";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import HomeIcon from "@material-ui/icons/Home";

import { cardTitle } from "assets/jss/material-kit-react.js";

import axios from "axios";

// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
//import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Parallax from "components/Parallax/Parallax.js";
// sections for this page
// import HeaderLinks from "components/Header/HeaderLinks.js";
// import SectionBasics from "./Sections/SectionBasics.js";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import stylesComp from "assets/jss/material-kit-react/views/components.js";

const styles = {
  ...imagesStyles,
  ...stylesComp,
  cardTitle
};

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();

  const [value, setValue] = useState([]);

  useEffect(() => {
    let config = {
      headers: {
        "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
        "x-rapidapi-key": "36584a6d73msh64de65f76aa6f01p10cddajsnbedfe6459110"
      }
    };
    console.log(config);
    axios
      .get(
        `https://corona-virus-world-and-india-data.p.rapidapi.com/api_india_timeline`,
        config
      )
      .then(res => {
        setValue(JSON.stringify(res.data.pop())); //needed to stringify object before setting value.
      });
  }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  const { ...rest } = props;
  let record = value.length >= 1 ? JSON.parse(value) : [];
  return (
    <div>
      <Header
        brand={<HomeIcon style={{ color: "#9c27b0" }} />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "rose"
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/bg11.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Covid-19 Live Updates</h1>
                <h3 className={classes.subtitle}>
                  Updates on India and world.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Card>
          <CardHeader className={classes.textCenter} color="info">
            INDIA
          </CardHeader>
          <CardBody>
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
            <p>
              <Button color="primary">Show more info</Button>
            </p>
          </CardBody>
          <CardFooter className={classes.textMuted}>
            Last updated: {record.date}
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
