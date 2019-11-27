import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(-3),
    right: theme.spacing(3)
  },
});

class SpeedDialTooltip extends React.Component {
  state = {
    open: false,
    hidden: false,
  };

  handleVisibility = () => {
    this.setState(state => ({
      open: false,
      hidden: !state.hidden,
    }));
  };

  buttonData = (buttonName) => {
    return this.props.actions.find(a => {
      return a.name === buttonName
    })
  }

  handleClick = () => {
    this.setState({open: !this.state.open})
  }

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes, actions } = this.props;
    const { hidden, open } = this.state;

    return (
      <div className={classes.speedDial}>
        <SpeedDial
          ariaLabel="SpeedDial with Tooltip"
          hidden={hidden}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => this.props.handleButtonClick(action.id)}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

export default withStyles(styles)(SpeedDialTooltip);
