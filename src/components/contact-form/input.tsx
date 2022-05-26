import { FC } from 'react'
import { Grid, TextField } from '@mui/material'

type InputFieldProps = {
  emailjsIdentifier: string
  label: string
}

export const InputField: FC<InputFieldProps> = ({
  emailjsIdentifier,
  label
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        required
        name={`user_${emailjsIdentifier}`}
        type={
          emailjsIdentifier.toLocaleLowerCase() === 'email' &&
          label.toLocaleLowerCase() === 'email'
            ? 'email'
            : 'text'
        }
        multiline={
          emailjsIdentifier.toLocaleLowerCase() === 'message' &&
          label.toLocaleLowerCase() === 'message'
            ? true
            : false
        }
        rows={
          emailjsIdentifier.toLocaleLowerCase() === 'message' &&
          label.toLocaleLowerCase() === 'message'
            ? 4
            : 1
        }
        label={`${label}`}
        variant='outlined'
        fullWidth
      />
    </Grid>
  )
}
