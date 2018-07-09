import React, {Component} from 'react';
import LineGraph from '../../graph-components/LineGraph'
import BarChart from '../../graph-components/BarChart'
import Button from '@material-ui/core/Button';

class AssetBalanceGraph extends Component {

  constructor(props){
    super(props)
    this.state = {
      graph:'combined'
    }
  }

  renderRetirementOutflow() {

    if (this.state.graph == 'income needed') {

      const dataResults  = this.props.results

      let data1 = Object.keys(dataResults).map(function(key) {
        return {
          x: dataResults[key].age,
          y: Math.round(dataResults[key].adjustedNeed/12)
        };
      });

      data1 = data1.slice((this.props.assumptions.retirementAge - this.props.assumptions.currentAge))

      return(
        <BarChart
          id={this.props.id}
          data1={data1}
          fill='reverse'
          targetSvg={this.props.targetSvg}
          title='Year to Year Needed Income'/>
      )
    }

  }

  renderAssetBalance() {

    if (this.state.graph == 'asset balance') {

      const results  = this.props.results

      let data1 = Object.keys(results).map(function(key) {
        return {
          x: results[key].age,
          y: results[key].yearStart
        };
      });

      return(
        <BarChart
          id={this.props.id}
          data1={data1}
          targetSvg={this.props.targetSvg}
          title='Year to Year Start Balance'/>
      )
    }

  }

  renderLineGraph() {

    if (this.state.graph == 'combined') {

      const results  = this.props.results

      let data1 = Object.keys(results).map(function(key) {
        return {
          x: results[key].age,
          y: results[key].yearStart
        };
      });

      let data2 = Object.keys(results).map(function(key) {

        return {
          x: results[key].age,
          y: results[key].incomeNeeds
        };
      });


      data2 = data2.slice((this.props.assumptions.retirementAge - this.props.assumptions.currentAge))

      return (
        <LineGraph
          id={this.props.id}
          data1={data1}
          legend1={'Asset Balance'}
          data2={data2}
          legend2={'Income Need'}
          fillData2={true}
          targetSvg={this.props.targetSvg}
          title='General Overview'/>
      );

    }

  }

  render() {



    return (
      <div style={{
        paddingLeft:'10px',
        margin:'auto',
        height:'430px'
      }}>

      <div className="text-center pt-2">
      <Button
        variant="contained"
        className="text-steelblue small-margin"
        color="secondary"
        onClick={(e)=>{
          e.preventDefault()
          this.setState({graph:'asset balance'})
        }}
      >
          Zoom Asset Balance
        </Button>

        <Button
          variant="contained"
          className="text-darkOrange small-margin"
          color="secondary"
          onClick={(e)=>{
            e.preventDefault()
            this.setState({graph:'income needed'})
          }}
        >
          Zoom Income Need
        </Button>

        <Button
          variant="contained"
          className="text-primary small-margin"
          color="secondary"
          onClick={(e)=>{
            e.preventDefault()
            this.setState({graph:'combined'})
          }}
        >
          Overview
        </Button>
      </div>

      {this.renderLineGraph()}

      {this.renderRetirementOutflow()}

      {this.renderAssetBalance()}

      </div>
    );
  }

}



export default AssetBalanceGraph
