import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

class Snacker extends React.Component {
  state = {
    open: false,
    Transition: null,
  };

  handleClick = Transition => () => {
    this.setState({ open: true, Transition });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Icon
          onClick={this.handleClick(TransitionUp)}
          >help</Icon>

        <Snackbar
          color="inherit"
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'class': 'snackbar',
          }}
          message={

                <Typography className='flex snackbar-text' variant="body1" color="secondary">
                  {this.props.message}
                </Typography>

          }
        />
      </div>
    );
  }
}

export default Snacker;
