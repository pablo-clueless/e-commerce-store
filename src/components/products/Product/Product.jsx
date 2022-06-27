import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import useStyles from './style'

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles()
    
  return (
      <Card className={classes.root}>
          <CardMedia className={classes.media} image={product.assets[0].url} title={product.name} />
          <CardContent >
              <div>
                  <Typography variant='body1'>
                      {product.name}
                  </Typography>
                  <Typography variant='body2' gutterBottom>
                      {product.price.formatted_with_symbol}
                  </Typography>
              </div>
              <Typography variant='caption' color='textSecondary' dangerouslySetInnerHTML={{
                  __html: product.description.substring(0, 100)
              }} />
                  {/* {product.description.substring(0, 100)}
                  {product.description.length >= 100 && '...'}
              </Typography> */}
          </CardContent>
          <CardActions disableSpacing className={classes.cardActions}>
              <IconButton aria-label='Add to cart' onClick={() => onAddToCart(product.id, 1)} >
                  <AddShoppingCart />
              </IconButton>
          </CardActions>
      </Card>
  )
}

export default Product