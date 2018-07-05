import React, {Component} from 'react';

import d3 from 'd3/dist/d3';


class TestGraph extends Component {

  // componentDidMount() {
  //     var rectWidth = 100;
  //     var height = 300;
  //     var data = [100, 250, 175, 200, 300];
  // 
  //     var rect = d3.select('rect')
  //       .data(data)
  //       .attr('x', (d, i) => i * rectWidth)
  //       .attr('y', d => height - d)
  //       .attr('width', d=> d)
  //       .attr('height', d => d)
  //       .attr('fill', 'blue')
  //       .attr('stroke', '#fff')
  //
  //
  //     console.log(rect)
  //
  // }

  render() {


    return (
      <div>
      <svg>
      <rect />
      </svg>
      </div>
    );
  }

}



export default TestGraph
