import React, {Component} from 'react';

import * as d3 from "d3";

class BarChart extends Component {

  constructor(props) {
    super(props)
    this.state={
      width: window.innerWidth < 600 ?  window.innerWidth - 20 : window.innerWidth/2
    }
  }

  renderGraphs(width) {

    const height = 300;
    const margin = {top: 60, bottom: 60, left: 60, right: 60};



    let dataScale = this.props.dataScale

    const data1 = this.props.data1

    if(!dataScale){
      dataScale = data1
    }

    var xMax = d3.max(data1, d => d.x);
    var xScale = d3.scaleLinear()
    	.domain([data1[0].x, xMax+1])
    	.range([margin.left, width - margin.right]);

    var yMax = d3.max(data1, d => d.y);
    var yScale = d3.scaleLinear()
    	.domain([0, yMax])
    	.range([height - margin.bottom, margin.top]);

    var heightScale = d3.scaleLinear()
    	.domain([0, yMax])
    	.range([0, height - margin.top - margin.bottom]);

      // create the rectangles
      var svg = d3.select('#'+this.props.targetSvg)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", this.props.id)

      var rect = svg.selectAll('rect')
      	.data(data1)
      	.enter().append('rect')
      	.attr('width', (width-margin.left-margin.right)/35)
      	.attr('height', function(d) {
          return heightScale(d.y);
        })
      	.attr('x', function(d) {return xScale(d.x)})
      	.attr('y', function(d) {return yScale(d.y)})
      	.attr('fill', this.props.fill == 'reverse' ? 'darkOrange' : '#6798c1')
      	.attr('stroke', 'white')
        .attr('strokeWidth', 1)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    function handleMouseOver(d, i) {  // Add interactivity

       d3.select(this)
        .attr('fill', this.attributes.fill.value=='darkOrange' ? "#6798c1" : 'orange');

        svg.append("text")
         .attr("class", 'tip')
         .attr("y", yScale(0)+16.8)
         .attr("x", xScale(d.x))
         .attr("text-anchor", "middle")
         .style("font-size", "12px")
         .text((d.x))
         .attr('fill','darkGray')
         .attr('stroke','#000000')
         // .attr('font-family','Arial')

       svg.append("text")
        .attr("class", 'tip')
        .attr("y", yScale(d.y)-7)
        .attr("x", xScale(d.x))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text(d3.format("$,")(d.y))
        .attr('fill','orange')
        .attr('stroke','black')
        .attr('stroke-width',"1.4")
        .attr('font-family','Arial')


       // .attr('font-family','Arial')

     }

     function handleMouseOut(d, i) {
       d3.select(this)
        .attr('fill', this.attributes.fill.value=='#6798c1' ? "darkOrange" : '#6798c1');

      d3.selectAll('.tip').remove();

     }

     svg.append("text")
       .attr("x", (width / 2))
       .attr("y", (margin.top-25))
       .attr("text-anchor", "middle")
       .style("font-size", "20px")
       .style("text-decoration", "underline")
       .text(this.props.title)

     svg.append("text")
       .attr("x", (width/2))
       .attr("y", (height-(margin.bottom/2)))
       .attr("text-anchor", "middle")
       .style("font-size", "14px")
       .text("age")


      var xAxis = d3.axisBottom()
      	.scale(xScale);


      var yAxis = d3.axisLeft()
      	.scale(yScale)
        .tickFormat(d3.format("$,"));

      svg.append('g')
        .attr('class','gray-axis')
      	.attr('transform', 'translate(' + [0, height - margin.bottom] + ')')
      	.call(xAxis);
      svg.append('g')
      	.attr('transform', 'translate(' + [margin.left, 0] + ')')
      	.call(yAxis);

  }

  componentDidUpdate() {
    d3.selectAll("."+this.props.id).remove();

    this.renderGraphs(this.state.width)

  }

  componentDidMount() {
    const self = this
    const lWidth = window.screen.width
    let width = window.innerWidth
    if (lWidth > 900) {
      width < 600 ? width = window.innerWidth - 20 : width = window.innerWidth/2

      window.addEventListener('resize', function(e){
        e.preventDefault();
        width = window.innerWidth
        width < 600 ? self.setState({width:width}) : self.setState({width:width/2})

      })
    } else {
      width = lWidth-20
    }

    this.renderGraphs(width)
  }



  render() {

    return (
      <svg className="bar-chart" id={this.props.targetSvg}/>
    );
  }

}



export default BarChart
