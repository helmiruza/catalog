import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const styles = theme => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(-3),
    right: theme.spacing(3)
  },
});

class SpeedDialButton extends React.Component {
  state = {
    hidden: false,
  };

  handleVisibility = () => {
    this.setState(state => ({
      hidden: !state.hidden,
    }));
  };

  buttonData = (buttonName) => {
    return this.props.actions.find(a => {
      return a.name === buttonName
    })
  }

  // handleOpen = () => {
  //   if (!this.state.hidden) {
  //     this.setState({
  //       open: true,
  //     });
  //   }
  // };

  // handleClose = () => {
  //   this.setState({
  //     open: false,
  //   });
  // };

  render() {
    const { classes, open, actions, onClick } = this.props;
    const { hidden } = this.state;

    return (
      <div className={classes.speedDial}>
        <SpeedDial
          ariaLabel="SpeedDial Button"
          hidden={hidden}
          icon={<SpeedDialIcon />}
          open={open}
          onClick={() => onClick()}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => console.log('clicked')}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

export default withStyles(styles)(SpeedDialButton);
