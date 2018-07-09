import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import calcImg from '../../src/calc-banner2.jpg';
import resultsImg from '../../src/graphs-banner2.jpg';



class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

    }


    render(){

      return (
        <div className="">

          <Grid className="" container spacing={0} style={{padding: 30}}>

            <Grid className="center" item xs={12} sm={8} lg={5} xl={5}>
              <Card color="secondary" className='card'>

                <CardMedia>
                  <img alt="cardbanner" className="card-banner" src={calcImg}/>
                </CardMedia>

                <CardContent>
                  <Typography className='card-description' variant="subheading" color="inherit">
                     Calculate you're current financial plan against you're desired income in retirement.
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button variant="contained" className="start-now" color="primary"
                    onClick={()=>{
                      this.props.history.push('/calculator')
                    }}>
                    Start Now
                  </Button>
                </CardActions>

              </Card>
            </Grid>

            <Grid className="center" item xs={12} sm={8} lg={5} xl={5}>
              <Card color="secondary" className='card'>

                <CardMedia>
                  <img alt="cardbanner" className="card-banner" src={resultsImg}/>
                </CardMedia>

                <CardContent>
                  <Typography className='card-description' variant="subheading" color="inherit">
                     View your calculated results from your saved retirement information.
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button variant="contained" className="start-now" color="primary"
                    onClick={()=>{
                      this.props.history.push('/results')
                    }}>
                    View My Results
                  </Button>
                </CardActions>

              </Card>
            </Grid>

          </Grid>

        </div>
      );
    }
}

export default Dashboard
