import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Router from 'next/router'

const useStyles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  paper: {
    padding: theme.spacing(1, 0),
    backgroundColor: 'transparent'
  },
});

class CollapsedBreadcrumbs extends React.Component {
  handleClick = (event, link) => {
    if (link) Router.push(link)
  }

  render () {
    const { classes, links } = this.props

    return (
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          {links && links.map(link =>
            <React.Fragment key={`breadcrumbs-${link.text}`}>
              {link.link !== null
                ? <Link color="inherit" href="#" onClick={(e) => this.handleClick(e, link.link)}>
                    {link.text}
                  </Link>
                : <Typography color="textPrimary">{link.text}</Typography>
              }
            </React.Fragment>
          )}
        </Breadcrumbs>
      </Paper>
    )
  }

}

export default withStyles(useStyles)(CollapsedBreadcrumbs)
