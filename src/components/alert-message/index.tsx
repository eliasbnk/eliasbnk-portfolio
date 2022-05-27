import React, { FC } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { useFormContext } from 'contexts/form-context'

// For some stupid reason Chrome doesn't support onClose={handleClose} and throws an error, even though MUI docs says it's fine: https://mui.com/material-ui/react-snackbar/#customization.
// for your own sanity do not touch it!

export const AlertMessage: FC = () => {
  const { showAlert, handleClose } = useFormContext()

  const vertical = 'top'
  const horizontal = 'right'

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={showAlert}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} sx={{ width: '100%' }} severity='success'>
        Message Sent Successfully!
      </Alert>
    </Snackbar>
  )
}
