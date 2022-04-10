import React, { useEffect, useState } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'

import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ cart }) => {
    const classes = useStyles()

    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    
    useEffect(() => {
      const generateToken = async() => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
          setCheckoutToken(token)
        } catch (error) {}
      }

      generateToken()
    },[])

    const Confirmation = () => { return <div>Confirmation</div>}

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} /> : <PaymentForm />

  return (
      <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h5' align='center' >Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper} >
            {steps.map((step, i) => (
              <Step key={i}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
      </>
  )
}

export default Checkout