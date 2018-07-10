import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchResults } from '../../actions'
import ReactTable from 'react-table';
import Grid from '@material-ui/core/Grid';
import LineChart from 'react-d3-components/lib/LineChart';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

import SuccessGauge from './SuccessGauge'
import ContributionsGraph from './ContributionsGraph'
import AssetBalanceGraph from './AssetBalanceGraph'
import LinearDeterminate from '../commons/LinearDeterminate'

class ResultsPage extends Component {

  constructor(props) {
    super(props)

    this.state={
      didNotLoad:false
    }
  }

  componentDidMount(){
    this.props.fetchResults()
  }

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

    let data = [
      {
        label: 'somethingelse',
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

  renderResultsLoadings () {
    let self = this
    if (!this.state.didNotLoad){
      return(
        <Typography className="ml-1 pt-1" variant="headline">Searching for saved Results. If the page does not load, it probably means that there are no saved results. Please input new data into the retirement calculator</Typography>
      )
    } else {
      return(
        <Typography className="ml-1 pt-1" variant="headline">Could not find any saved results. Please return to the home page and go use the calculator to view your retirement calculations</Typography>
      )
    }
  }

  handleBack() {
    this.props.history.push('/')
  }

  renderYearRanOut(yearRanOut, lifeExpectancy){
    if(yearRanOut.age<=lifeExpectancy){
      return(
        <Typography className="px-2" variant="subheading">
      Your current plan&#39;s funds run out at age {yearRanOut.age}
      </Typography>
      )
    }
  }

  render(){

    // render results to client if results exists, otherwise render a loading screen
    if (this.props.results) {

        const dataResults = this.props.results.data
        const planResults = this.props.results.plan
        let data = Object.keys(dataResults).map(function(key) {
          return {
            age: dataResults[key].age,
            yearStart: dataResults[key].yearStart
          };
        });

        const { retirementAge, lifeExpectancy } = this.props.results.assumptions

        let yearRanOut = data.find(function(item){
        	if(item.yearStart<=0 && item.age>retirementAge){
        		return true
            } else {
        		return false
            }
        })

        return (
          <Grid className="small-padding" container spacing={8} style={{padding: 20}}>

            <Grid className="small-padding" item xs={12} sm={6} lg={6} xl={6}>

              <Paper className="graph-container">
                <Toolbar className="text-center plan-header">

                  <Typography className="text-white center" variant="title">
                  Your current plan:
                  </Typography>
                </Toolbar>

                <SuccessGauge
                  assumptions={this.props.results.assumptions}
                  dataResults={dataResults}
                  retirementGoal={this.props.results.retirementGoal}
                  id="success-gauge1id"
                  targetSvg='success-gauge1'/>

                <ContributionsGraph
                  assumptions={this.props.results.assumptions}
                  contributionsIncrease={this.props.results.currentStatus.increaseContributions}
                  dataResults={dataResults}
                  planResults={planResults}
                  retirementGoal={this.props.results.retirementGoal}
                  id="contributions-graph1id"
                  targetSvg='contributions-graph1'/>

                <AssetBalanceGraph
                  assumptions={this.props.results.assumptions}
                  results={dataResults}
                  id="asset-balance-graph1id"
                  targetSvg='asset-balance-graph1'/>

                  {yearRanOut ? this.renderYearRanOut(yearRanOut, lifeExpectancy):''}




              </Paper>

            </Grid>
            <Grid className="small-padding" item xs={12} sm={6} lg={6} xl={6}>

              <Paper className="graph-container">

                <Toolbar className="text-center plan-header">

                  <Typography className="text-white center" variant="title">
                  Your recommended plan:
                  </Typography>

                </Toolbar>

              <SuccessGauge
                assumptions={this.props.results.assumptions}
                dataResults={this.props.results.plan}
                retirementGoal={this.props.results.retirementGoal}
                id="success-gauge2id"
                targetSvg='success-gauge2'/>

              <ContributionsGraph
                assumptions={this.props.results.assumptions}
                contributionsIncrease={this.props.results.currentStatus.increaseContributions}
                dataResults={planResults}
                retirementGoal={this.props.results.retirementGoal}
                planResults={planResults}
                id="contributions-graph2id"
                targetSvg='contributions-graph2'/>

              <AssetBalanceGraph
                assumptions={this.props.results.assumptions}
                results={planResults}
                id="asset-balance-graph2id"
                targetSvg='asset-balance-graph2'/>

              </Paper>
            </Grid>

{this.renderTable(dataResults)}
          </Grid>
        )

    } else {

        return(
          <div className='wrapper loading'>

            <div className='loading-screen'>

            <LinearDeterminate/>

              {this.renderResultsLoadings()}

            </div>
            <div className="loading-back">

              <Button
                className="loading-back-button"
                variant="contained"
                color="secondary"
                onClick={(e)=>{
                  e.preventDefault()
                  this.handleBack()
                }}
              >
                Back
              </Button>
            </div>

          </div>
        );
    }

  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchResults }, dispatch);
}

function mapStateToProps(state) {
  return {results : state.results, calculations: state.calculations}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
