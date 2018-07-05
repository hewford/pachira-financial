import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

// import loader from '../loading-gif.gif';
import calcImg from '../../src/calc-banner2.jpg';

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

    }


    render(){

      return (
        <div className="text-center">

          <Grid className="" container spacing={24} style={{padding: 24}}>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Card color="secondary" className='card'>

                <img alt="cardbanner" className="card-banner" src={calcImg}/>

                <CardActions>
                  <Button className="start-now" size="small" color="primary"
                    onClick={()=>{
                      console.log(this.props)
                      this.props.history.push('/calculator')
                    }}>
                    Start Now
                  </Button>
                </CardActions>

              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={3}>

              <Card color="secondary" className='card'>

                <img alt="cardbanner" className="card-banner" src={calcImg}/>

                <CardActions>
                  <Button className="start-now" size="small" color="primary"
                    onClick={()=>{
                      console.log(this.props)
                      this.props.history.push('/calculator')
                    }}>
                    Start Now
                  </Button>
                </CardActions>

              </Card>
            </Grid>

            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Card color="secondary" className='card'>

                <img alt="cardbanner" className="card-banner" src={calcImg}/>

                <CardActions>
                  <Button className="start-now" size="small" color="primary"
                    onClick={()=>{
                      console.log(this.props)
                      this.props.history.push('/calculator')
                    }}>
                    Start Now
                  </Button>
                </CardActions>

              </Card>
            </Grid>


            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Card color="secondary" className='card'>

                <img alt="cardbanner" className="card-banner" src={calcImg}/>

                <CardActions>
                  <Button className="start-now" size="small" color="primary"
                    onClick={()=>{
                      console.log(this.props)
                      this.props.history.push('/calculator')
                    }}>
                    Start Now
                  </Button>
                </CardActions>

              </Card>
            </Grid>


            <Grid item xs={12} sm={6} lg={4} xl={3}>
              <Card color="secondary" className='card'>

                <img alt="cardbanner" className="card-banner" src={calcImg}/>

                <CardActions>
                  <Button className="start-now" size="small" color="primary"
                    onClick={()=>{
                      console.log(this.props)
                      this.props.history.push('/calculator')
                    }}>
                    Start Now
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
