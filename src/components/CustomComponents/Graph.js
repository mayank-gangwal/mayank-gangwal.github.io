import React, { Component } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Graph extends Component {
  componentDidMount() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var timeline = JSON.parse(this.props.data); //reading prop, converting to JSON format

    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    createSeries("value1", "Total cases");
    createSeries("value2", "Total deaths");
    createSeries("value3", "Total recovered");

    // Create series
    function createSeries(s, name) {
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value" + s;
      series.dataFields.dateX = "date";
      series.name = name;

      let segment = series.segments.template;
      segment.interactionsEnabled = true;

      let hoverState = segment.states.create("hover");
      hoverState.properties.strokeWidth = 3;

      let dimmed = segment.states.create("dimmed");
      dimmed.properties.stroke = am4core.color("#dadada");

      segment.events.on("over", function(event) {
        processOver(event.target.parent.parent.parent);
      });

      segment.events.on("out", function(event) {
        processOut(event.target.parent.parent.parent);
      });

      let data = [];
      let cases, death, recovered;
      for (let i = 1; i < timeline.length; i++) {
        let dataItem = { date: timeline[i].date };
        if (s === "value1") {
          dataItem["value" + s] = timeline[i].totalconfirmed;
        } else if (s === "value2") {
          dataItem["value" + s] = timeline[i].totaldeceased;
        } else {
          dataItem["value" + s] = timeline[i].totalrecovered;
        }

        data.push(dataItem);
      }

      series.data = data;
      return series;
    }

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.scrollable = true;
    chart.legend.itemContainers.template.events.on("over", function(event) {
      processOver(event.target.dataItem.dataContext);
    });

    chart.legend.itemContainers.template.events.on("out", function(event) {
      processOut(event.target.dataItem.dataContext);
    });

    function processOver(hoveredSeries) {
      hoveredSeries.toFront();

      hoveredSeries.segments.each(function(segment) {
        segment.setState("hover");
      });

      chart.series.each(function(series) {
        if (series !== hoveredSeries) {
          series.segments.each(function(segment) {
            segment.setState("dimmed");
          });
          series.bulletsContainer.setState("dimmed");
        }
      });
    }

    function processOut(hoveredSeries) {
      chart.series.each(function(series) {
        series.segments.each(function(segment) {
          segment.setState("default");
        });
        series.bulletsContainer.setState("default");
      });
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id="chartdiv" style={{ width: "100%", height: "500px" }} />;
  }
}

export default Graph;
