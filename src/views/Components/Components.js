import React from "react";

import HomeIcon from "@material-ui/icons/Home";

import IndiaSumary from "components/CustomComponents/IndiaSummary.js";
import DetailedDescription from "components/CustomComponents/DetailedDescription.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Parallax from "components/Parallax/Parallax.js";

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

  const { ...rest } = props;

  return (
    <div>
      <Header
        brand={<HomeIcon style={{ color: "#9c27b0" }} />}
        fixed
        color="transparent"
        changeColorOnScroll={{ height: 100, color: "rose" }}
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
        <IndiaSumary />
      </div>

      <div style={{ padding: "50px" }} className={classNames(classes.main)}>
        <h1 style={{ color: "#e91e63" }} className={classes.title}>
          Detailed Description
        </h1>
        <DetailedDescription />
      </div>

      <Footer />
    </div>
  );
}
