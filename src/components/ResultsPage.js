import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchResults } from '../actions'
import ReactTable from 'react-table';
import Grid from '@material-ui/core/Grid';

class ResultsPage extends Component {


  componentWillMount(){
    this.props.fetchResults()
  }

  renderTable = () => {

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


    let results = this.props.results.data;

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

    console.log(this.props)

    return (
      <Grid className="" container spacing={0} style={{padding: 1}}>

        <Grid item xs={12} sm={9} lg={6} xl={6}>
          {this.renderTable()}
        </Grid>
      </Grid>
    )



  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchResults }, dispatch);
}

function mapStateToProps(state) {
  return {results : state.results}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
