import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'

import useStyles from './styles'
import logo from '/assets/branding.png'

const Navbar = ({ totalItems }) => {
    const classes = useStyles()
    const location = useLocation()
    
  return (
      <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
          <Toolbar>
            <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit' >
                <img src={logo} alt='e-commerce' height='25px' className={classes.image} />
                PABLO'S STORE
            </Typography>
            <div className={classes.grow} />
            {location.pathname === '/' &&
            <div className={classes.button}>
                <IconButton aria-label='Show cart item' color='inherit' >
                    <Badge component={Link} to='/cart' badgeContent={totalItems} color='secondary' >
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </div>}
          </Toolbar>
      </AppBar>
      </>
  )
}

export default Navbar