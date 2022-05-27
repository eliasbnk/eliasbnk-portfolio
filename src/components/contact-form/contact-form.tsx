import React, { FC } from 'react'
import { Grid, Button, Card, CardContent, Typography } from '@mui/material'
import { useFormContext } from 'contexts/form-context'
import { AlertMessage } from 'components/alert-message'
import { InputField } from './input-field'

export const ContactForm: FC = () => {
  const { handleSubmit, hasErrors } = useFormContext()

  const disabled = hasErrors()
  return (
    <>
      <AlertMessage />
      <Grid>
        <Card
          style={{
            border: 'none',
            boxShadow: 'none',
            maxWidth: '28.125em',
            padding: '1.25em 0.3125em',
            margin: '0 auto'
          }}
        >
          <CardContent>
            <Typography gutterBottom variant='h5'>
              Lets Get In Touch
            </Typography>

            <form
              onSubmit={e => {
                e.preventDefault()
                handleSubmit()
              }}
              autoComplete='off'
            >
              <Grid container spacing={1}>
                <InputField label={'Name'} id={'name'} />
                <InputField label={'Email'} id={'email'} />
                <InputField label={'Message'} id={'message'} />
                <Grid item xs={12}>
                  <Button
                    disabled={disabled}
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
