import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { commerce } from '../../lib/commerce'
// import FormInput from './FormInput'

const AddressForm = ({ checkoutToken, next }) => {
  //values provided by commercejs
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')

  //user info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address1, setAddress1]= useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')

  const methods = useForm()

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
  const options = shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})` }))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince })

    setShippingOptions(options)
    setShippingOption(options[0].id)
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])

  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => {
          next({...data, firstName, lastName, email, address1, city, zip, shippingCountry, shippingSubdivision, shippingOption})
          console.log(data)
        })} >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} >
              <TextField fullWidth label='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required variant='outlined' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} required variant='outlined' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Emmail' value={email} onChange={(e) => setEmail(e.target.value)} required variant='outlined' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Address Line 1' value={address1} onChange={(e) => setAddress1(e.target.value)} required variant='outlined' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='City' value={city} onChange={(e) => setCity(e.target.value)} required variant='outlined' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Zip/Postal Code' value={zip} onChange={(e) => setZip(e.target.value)} required variant='outlined' />
            </Grid>

            {/* select options */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)} variant='outlined'>
                {countries.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)} variant='outlined'>
                {subdivisions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)} variant='outlined'>
                {options.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to={'/cart'}>
                  <Button variant='outlined'>Back to Cart</Button>
            </Link>
            <Button type="submit" variant='contained' color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm