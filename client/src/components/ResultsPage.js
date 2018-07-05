
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchResults } from '../actions'
import ReactTable from 'react-table';
import Grid from '@material-ui/core/Grid';
import LineChart from 'react-d3-components/lib/LineChart';
import d3 from 'd3/dist/d3';
import scaleBand from 'd3/dist/d3';



class ResultsPage extends Component {

  componentWillMount(){
    this.props.fetchResults()
  }

  // componentDidMount(){
  //
  //       var rectWidth = 100;
  //       var height = 300;
  //       var data = [100, 250, 175, 200, 300];
  //
  //       var rect = d3.selectAll('rect')
  //       	.data(data)
  //       	.attr('x', (d, i) => i * rectWidth)
  //       	.attr('y', d => height - d)
  //       	.attr('width', d=> d)
  //       	.attr('height', d => d)
  //       	.attr('fill', 'blue')
  //       	.attr('stroke', '#fff')
  //
  //
  //       console.log(rect)
  // }

  renderTestBarChart = (results) => {

    let values1 = Object.keys(results).map(function(key) {
      return {
        x: results[key].age,
        y: results[key].yearStart
      };
    });
    let values2 = Object.keys(results).map(function(key) {
      return {
        x: results[key].age,
        y: results[key].adjustedNeed
      };
    });

    let onlyY = Object.keys(results).map(function(key) {
      return results[key].adjustedNeed
    });
    console.log(onlyY)

    let data = [{
      label: 'age',
      values: values1
    },
    {
      label: 'need',
      values: values2
    }];


    return(
      <LineChart
        data={data}
        width={800}
        height={400}
        margin={{top: 10, bottom: 50, left: 150, right: 10}}
        xAxis={{innerTickSize: 2, label: "age"}}
        yAxis={{label: "balance"}}
        shapeColor={"red"}
        />
    );
  }

  renderTable = (results) => {

    let columns = [
      {
        Header: 'age',
        accessor: 'age'
      },
      {
        Header: 'Year Start',
        accessor: 'yearStart'
      },
      {
        Header: 'Contributions',
        accessor: 'yearlyContributions'
      },
      {
        Header: 'Interest Rate',
        accessor: 'interest'
      },
      {
        Header: 'Interest Growth',
        accessor: 'growth'
      },
      {
        Header: 'Income Needs',
        accessor: 'incomeNeeds'
      }
    ]

    for (let i=1; i <= this.props.results.pensionEntries; i++) {
      columns.push({
        Header: 'Pension ' + i,
        accessor: 'pension'+i
      })
    }

    for (let i=1; i <= this.props.results.rentalEntries; i++) {
      columns.push({
        Header: 'Rental ' + i,
        accessor: 'rental'+i
      })
    }


    columns.push({
      Header: 'Adjusted Need',
      accessor: 'adjustedNeed'
    },
    {
      Header: 'Year End',
      accessor: 'yearEnd'
    }

    )




    if(results){
      let data = Object.keys(results).map(function(key) {
        return results[key];
      });

      return <ReactTable className="shrink"
        getTrProps={(state, rowInfo, column) => {
          return {
            onClick: (e) => {
              e.preventDefault()
            }
          }
        }}
        data={data}
        columns={columns}
      />

    } else {
      return (<div/>);
    }





  }

  render(){

    let results = this.props.results.data;

    console.log(this.props)


    if (results) {
      return (
        <Grid className="" container spacing={0} style={{padding: 1}}>

          <Grid item xs={12} sm={9} lg={6} xl={6}>
            {this.renderTable(results)}
          </Grid>
          <Grid item xs={12} sm={12} lg={12} xl={6}>
            {this.renderTestBarChart(results)}
          </Grid>
          <Grid item xs={12} sm={12} lg={12} xl={6}>
          <svg>
  <rect />
  <rect />
  <rect />
  <rect />
</svg>
          </Grid>
        </Grid>
      )
    } else {
      return(
        <svg>
    <rect />
    <rect />
    <rect />
    <rect />
  </svg>
      );

    }





  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchResults }, dispatch);
}

function mapStateToProps(state) {
  return {results : state.results}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
