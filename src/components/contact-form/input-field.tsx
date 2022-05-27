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

  const value = inputValue(id, label)
  const error =
    errorMessage(id, label) && touchedElement(id, label) ? true : false
  const helperText =
    errorMessage(id, label) && touchedElement(id, label)
      ? errorMessage(id, label)
      : ''
  return (
    <Grid item xs={12}>
      <TextField
        value={value}
        error={error}
        helperText={helperText}
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
