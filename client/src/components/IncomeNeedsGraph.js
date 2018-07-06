import React, {Component} from 'react';
import LineGraph from '../graph-components/LineGraph'

class IncomeNeedsGraph extends Component {

  componentDidMount() {

    const results  = this.props.results
    console.log(results)
    let data1 = Object.keys(results).map(function(key) {
      return {
        x: results[key].age,
        y: results[key].incomeInflation
      };
    });

    let data2 = data1.slice(0, 35)


  }



  render() {


    return (
      <div>

      </div>
    );
  }

}



export default IncomeNeedsGraph
