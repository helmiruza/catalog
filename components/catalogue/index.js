import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'

const useStyles = theme => ({
  catalogue: {
    minHeight: 418,
    '&:hover': {
      cursor: 'pointer'
    },
    '&:hover $imageContainer': {
      backgroundColor: 'black'
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 220,
    }
  },
  imageContainer: {
    height: 280,
    border: '1px solid #ddd',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 150,
    }
  },
  descriptionContainer: {
    margin: '8px 0px'
  },
  categories: {
    fontWeight: 600,
    color: 'grey',
    fontSize: 12
  }
})

class Catalogue extends React.Component {
  render () {
    const { classes, name, categories, price, url, imageUrl } = this.props

    return (
      <Link href={url}>
        <div className={classes.catalogue}>
          <div className={classes.imageContainer} style={{backgroundImage: `url(${imageUrl})`}}/>

          <div className={classes.descriptionContainer}>
            <Typography className={classes.categories}>
              {categories.toUpperCase()}
            </Typography>

            <Typography variant="body1" style={{fontWeight: 700}}>
              {name}
            </Typography>

            <Typography variant="body2">
              RM{price.toFixed(2)}
            </Typography>
          </div>
        </div>
      </Link>
    )
  }
}

export default withStyles(useStyles)(Catalogue)
