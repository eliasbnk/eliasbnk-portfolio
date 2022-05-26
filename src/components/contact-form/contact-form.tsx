import React, { useRef, FC } from 'react';

import { Grid, Button, Card, CardContent, Typography } from '@mui/material';
import { InputField } from './input';
import { useComponentContext } from '../component-context';
export const ContactForm: FC = () => {
  const form = useRef() as React.MutableRefObject<HTMLFormElement>;
  const { sendEmail } = useComponentContext();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    form: React.MutableRefObject<HTMLFormElement>
  ) => {
    e.preventDefault();
    sendEmail(e, form);
  };

  return (
    <>
      <Grid>
        <Card style={{ maxWidth: 450, padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant='h5'>
              Lets Get In Touch
            </Typography>
            <form ref={form} onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <InputField
                  data-testid='name-input-field'
                  emailjsIdentifier={'name'}
                  label={'Name'}
                />
                <InputField
                  data-testid='email-input-field'
                  emailjsIdentifier={'email'}
                  label={'Email'}
                />
                <InputField
                  data-testid='phone-number-input-field'
                  emailjsIdentifier={'phone_number'}
                  label={'Phone Number'}
                />
                <InputField
                  data-testid='message-input-field'
                  emailjsIdentifier={'message'}
                  label={'Message'}
                />
                <Grid item xs={12}>
                  <Button
                    data-testid='contact-form-send-button'
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
  );
};
