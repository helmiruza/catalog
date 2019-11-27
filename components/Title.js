import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Typography
} from '@material-ui/core'

const useStyles = theme => ({
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  default: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.drawer
  },
  textWhite: {
    color: '#FFF',
  }
})

class Title extends React.Component {
  render () {
    const { classes, content, iconsLeft } = this.props

    return (
      <div className={classes.default}>
        <Typography
          variant="h6"
          color="primary"
          className={iconsLeft ? clsx(classes.spaceBetween, classes.textWhite) : classes.textWhite}
        >
          {content}
          {iconsLeft ? iconsLeft : null}
        </Typography>
      </div>
    )
  }
}

export default withStyles(useStyles)(Title)
