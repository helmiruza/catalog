import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import Link from 'next/link'

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = (e) => {
    this.setState({anchorEl: e.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render () {
    const { options, children } = this.props

    return (
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          style={{padding: 0}}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={this.state.anchorEl ? true : false}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {children}
        </Menu>
      </div>
    )
  }
}
export default LongMenu
