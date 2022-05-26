import { FC } from 'react'
import { useComponentContext } from '../component-context'
import { Alert, Snackbar } from '@mui/material'

export const AlertMessage: FC = () => {
  const { open, handleClose } = useComponentContext()
  const vertical = 'top'
  const horizontal = 'right'
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} sx={{ width: '100%' }} severity='success'>
        Message Sent Successfully!
      </Alert>
    </Snackbar>
  )
}
