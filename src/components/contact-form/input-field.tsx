import React, { FC } from 'react'
import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'contexts/form-context'

type InputFieldProps = {
  label: string
  id: string
}

export const InputField: FC<InputFieldProps> = ({ label, id }) => {
  const { inputValue, errorMessage, touchedElement, handleBlur, handleChange } =
    useFormContext()

  return (
    <Grid item xs={12}>
      <TextField
        value={inputValue(id, label)}
        error={
          errorMessage(id, label) && touchedElement(id, label) ? true : false
        }
        helperText={
          errorMessage(id, label) && touchedElement(id, label)
            ? errorMessage(id, label)
            : ''
        }
        id={id}
        name={id}
        label={label}
        variant='outlined'
        fullWidth
        multiline={id.toLowerCase() === 'message' ? true : false}
        onBlur={handleBlur}
        rows={id.toLowerCase() === 'message' ? 4 : 1}
        onChange={handleChange}
      />
    </Grid>
  )
}
