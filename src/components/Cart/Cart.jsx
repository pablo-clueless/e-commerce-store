import React from 'react'
import { Container, Typography, Button, Grid} from '@material-ui/core'
import { Link } from 'react-router-dom'

import useStyles from './styles'
import CartItem from './CartItem/CartItem'

const Cart = ({ cart, handleUpdateCart, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles()

    const EmptyCart = () => {
        return (
            <div className={classes.centerDiv}>
                <img src="/assets/empty_cart.png" alt="empty_cart" width='50%' />
                <Typography variant='subtitle1'>
                    You have no items in your cart.
                    <br />
                    <Link to={'/'} className={classes.link}>&larr; Start shopping now!</Link>
                </Typography>
            </div>
        )
    }
    
    const FilledCart = () => {
        return (
            <>
            <Grid container spacing={3}>
                {cart.line_items.map(item => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} onUpdateCartQty={handleUpdateCart} onRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h5'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart} >
                        Empty Cart
                    </Button>
                    <Link to={'/checkout'}>
                        <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
                            Checkout
                        </Button>
                    </Link>
                </div>
            </div>
            </>
        )
    }

    if(!cart.line_items) return <h1>Loading...</h1>

  return (
    <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant='h4' gutterBottom >Your Shopping Cart</Typography>
        {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart