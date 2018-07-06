import React, {Component} from 'react';

import * as d3 from "d3";

// function responsivefy(svg) {
// // get container + svg aspect ratio
// var container = d3.select(svg.node().parentNode),
//     width = parseInt(svg.style("width")),
//     height = parseInt(svg.style("height")),
//     aspect = width / height;
//
// // add viewBox and preserveAspectRatio properties,
// // and call resize so that svg resizes on inital page load
// svg.attr("viewBox", "0 0 " + width + " " + height)
//     .attr("perserveAspectRatio", "xMinYMid")
//     .call(resize);
//
// // to register multiple listeners for same event type,
// // you need to add namespace, i.e., 'click.foo'
// // necessary if you call invoke this function for multiple svgs
// // api docs: https://github.com/mbostock/d3/wiki/Selections#on
// d3.select(window).on("resize." + container.attr("id"), resize);
//
// // get width of container and resize svg to fit it
// function resize() {
//     var targetWidth = parseInt(container.style("width"));
//     svg.attr("width", targetWidth);
//     svg.attr("height", Math.round(targetWidth / aspect));
// }
// }

class LineGraph extends Component {


  shouldComponentUpdate (nextProps, nextState) {
    // debugger;
    // You can access `this.props` and `this.state` here
    // This function should return a boolean, whether the component should re-render.
    return false
  }

  componentDidMount() {
    const lWidth = window.screen.width
    let width;
    lWidth > 900 ? width = lWidth/2 - 100 : width = lWidth
    const height = 300;
    const margin = {top: 50, bottom: 50, left: 50, right: 50};

    const data1 = this.props.data1
    const data2 = this.props.data2

    const xExtent1 = d3.extent(data1, d => Number(d.x) )
    console.log('xExtent1')
    console.log(xExtent1)

    const xScale = d3.scaleLinear()
      .domain(xExtent1)
      .range([margin.left, width - margin.right])

    console.log('xScale')
    console.log(xScale())

    const yMax = d3.max(data1, d => d.y)
    console.log('yMax')
    console.log(yMax)

    var yScale = d3.scaleLinear()
    	.domain([0, yMax])
    	.range([height - margin.bottom, margin.top]);

      var line = d3.line()
      	.x((d) => xScale(d.x))
      	.y((d) => yScale(d.y))

      var svg = d3.select('#'+this.props.targetSvg)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", "visualization");

      var path = svg.append("path")
        .attr("d", line(data2))
        .attr("stroke", "steelblue")
        .attr("stroke-width", "2")
        .attr("fill", "none");

      var xAxis = d3.axisBottom()
      	.scale(xScale)

      var yAxis = d3.axisLeft()
      	.scale(yScale)


      svg.append('g')
      	.attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
      	.call(xAxis)
      svg.append('g')
      	.attr('transform', 'translate(' + [margin.left, 0] + ')')
        .call((yAxis)
        .tickFormat(d3.format("$,")));


  }



  render() {


    return (
      <svg id={this.props.targetSvg}>

      </svg>
    );
  }

}



export default LineGraph
