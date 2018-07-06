
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchResults } from '../actions'
import ReactTable from 'react-table';
import Grid from '@material-ui/core/Grid';
import LineChart from 'react-d3-components/lib/LineChart';
import * as d3 from "d3";
import c3 from 'c3'
import scaleBand from 'd3/dist/d3';

import TestGraph from './TestGraph'







class ResultsPage extends Component {

  componentWillMount(){
    this.props.fetchResults()
  }

//   componentDidMount(){
//
//     var chart = c3.generate({
//     bindto: '#chart',
//     data: {
//       columns: [
//         ['data1', 30, 200, 100, 400, 150, 250],
//         ['data2', 50, 20, 10, 40, 15, 25]
//       ],
//       axes: {
//         data2: 'y2' // ADD
//       }
//     },
//     width: '100px',
//     height: '100px',
//
//     axis: {
//       y2: {
//         show: true // ADD
//       }
//     }
// });
// console.log(chart)
//
//   }

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
        y: results[key].incomeInflation
      };
    });

    // console.log(values1)
    // debugger;
    let onlyY = Object.keys(results).map(function(key) {
      return results[key].yearStart
    });
    // console.log(onlyY)

    let data = [
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
        <Grid className="" container spacing={0} style={{padding: 20}}>

          <Grid item xs={12} sm={9} lg={6} xl={6}>
            {this.renderTable(results)}
          </Grid>


          <Grid className="graph-container" item xs={12} sm={12} lg={6} xl={6}>

              <svg className="test-svg">
                <a/>
              </svg>
              <TestGraph results={results}/>

          </Grid>

          <Grid className="graph-container" item xs={12} sm={12} lg={6} xl={6}>

              <svg className="faux">
                <a/>
              </svg>


          </Grid>

        </Grid>
      )
    } else {
      return(
        <svg>
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
