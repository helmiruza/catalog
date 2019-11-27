import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import { Fab } from '@material-ui/core'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'
import ReorderIcon from '@material-ui/icons/Reorder'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const useStyles = theme => ({
  fab: {
    marginRight: 10,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  extendedIcon: {
    marginRight: 10
  }
})

class FabLink extends React.Component {
  getIcon = (type) => {
    const { classes } = this.props

    switch(type) {
      case 'add':
        return <AddIcon className={classes.extendedIcon} />
      case 'list':
        return <ReorderIcon className={classes.extendedIcon} />
      case 'file_copy':
        return <FileCopyIcon className={classes.extendedIcon} />
      case 'person_add':
        return <PersonAddIcon className={classes.extendedIcon} />
      default:
        return null
    }
  }

  handleClick = () => {
    const { changeToStatus, handleChangeStatus } = this.props
    if (changeToStatus) handleChangeStatus(changeToStatus)
  }

  render() {
    const { classes, children } = this.props

    return (
      <div style={{marginTop: 40}}>
        <div style={{position: 'fixed', bottom: 24, right: 24}}>
          {children.map((c, index) =>
            <Link
              as={c.as}
              href={c.href}
              key={`fab-${index}`}>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="add"
                className={clsx(classes.margin, classes.fab)}
                onClick={() => this.handleClick(c.as)}
              >
                {this.getIcon(c.icon)}
                {c.buttonText}
              </Fab>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles)(FabLink)
