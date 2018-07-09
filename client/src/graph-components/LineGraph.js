import React, {Component} from 'react';

import * as d3 from "d3";


class LineGraph extends Component {

  constructor(props) {
    super(props)
    this.state={
      width: window.innerWidth < 600 ?  window.innerWidth - 20: window.innerWidth/2
    }
  }

  renderGraphs(width) {

    const height = 300;
    const margin = {top: 60, bottom: 60, left: 60, right: 60};



    let dataScale = this.props.dataScale

    const data1 = this.props.data1

    let data2 = this.props.data2



    if(!dataScale){
      dataScale = data1
    }

    const xExtent1 = d3.extent(dataScale, d => Number(d.x) )

    const xScale = d3.scaleLinear()
      .domain(xExtent1)
      .range([margin.left, width - margin.right])

    const yMax = d3.max(dataScale, d => d.y)

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
        .attr("class", this.props.id)


      if(data2){

        if (this.props.fillData2){
          data2.push({x:data2[data2.length-1].x, y:0})
          data2.push({x:data2[0].x, y:0})

          svg.append("path")
            .attr("d", line(data2))
            .attr("stroke", "red")
            .attr("stroke-width", "1")
            .attr("fill", "darkOrange")

        } else {
          svg.append("path")
            .attr("d", line(data2))
            .attr("stroke", "steelblue")
            .attr("stroke-width", "1")
            .attr("fill", "none")
        }


      }

      svg.append("path")
        .attr("d", line(data1))
        .attr("stroke", "steelblue")
        .attr("stroke-width", "3")
        .attr("fill", "none")


      svg.append("text")
        .attr("x", (width / 2))
        .attr("y", (margin.top-10))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text(this.props.title)

        svg.append("text")
          .attr("x", (width/2))
          .attr("y", (height-(margin.bottom/2)))
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .text("age")


      svg.append("text")
          .attr("x", 100)
          .attr("y", height)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style('fill', 'steelblue')
          .text('• '+this.props.legend1)


      svg.append("text")
          .attr("x", 200)
          .attr("y", height)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style('fill', 'darkOrange')
          .text('• '+this.props.legend2)

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
        .tickFormat(d3.format("$,")))
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
      width < 600 ? width = window.innerWidth : width = window.innerWidth/2

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
      <svg className="line-graph" id={this.props.targetSvg}/>
    );
  }

}



export default LineGraph
