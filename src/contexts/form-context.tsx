import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import emailjs from '@emailjs/browser'

type FormContextTypes = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  errorMessage: (id: string, label: string) => string | undefined
  touchedElement: (id: string, label: string) => boolean | undefined
  hasErrors: () => boolean
  inputValue: (id: string, label: string) => string

  handleBlur: {
    (e: React.FocusEvent<any, Element>): void
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
  handleChange: {
    (e: React.ChangeEvent<any>): void
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void
  }
  handleClose: () => void
  showAlert: boolean
}

export const FormContext = createContext<FormContextTypes>({
  inputValue: {} as any,
  errorMessage: {} as any,
  touchedElement: {} as any,
  handleClose: {} as any,
  hasErrors: {} as any,
  handleSubmit: {} as any,
  handleBlur: {} as any,
  handleChange: {} as any,
  showAlert: false
})
export const FormContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [formSubmitResponse, setFormSubmitResponse] = useState<string>('')

  const [showAlert, setShowAlert] = useState<boolean>(false)

  useEffect(() => {
    formSubmitResponse === 'OK' ? setShowAlert(true) : setShowAlert(false)
  }, [formSubmitResponse])

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'please enter a valid name')
      .required(),

    email: Yup.string().email('please enter a valid email').required(),
    message: Yup.string().min(2).required()
  })

  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      message: '',
      email: ''
    },
    onSubmit: async values => {
      try {
        await emailjs
          .send(
            'service_hls8udj',
            'template_exwu0j3',
            values,
            'MFuEKG7t77Brf5kGM'
          )
          .then(
            response => {
              setFormSubmitResponse(response.text)
            },
            error => {
              console.error('FAILED...', error)
            }
          )
      } catch ({ message }) {
        console.error(message)
      } finally {
        formik.resetForm()
      }
    }
  })

  const { handleSubmit, values, errors, touched, handleBlur, handleChange } =
    formik

  const inputValue = (id: string, label: string) => {
    if (id.toLowerCase() === 'name' && label.toLowerCase() === 'name')
      return values.name
    else if (id.toLowerCase() === 'email' && label.toLowerCase() === 'email')
      return values.email
    else {
      return values.message
    }
  }

  const errorMessage = (id: string, label: string) => {
    if (id.toLowerCase() === 'name' && label.toLowerCase() === 'name')
      return errors.name
    else if (id.toLowerCase() === 'email' && label.toLowerCase() === 'email')
      return errors.email
    else {
      return errors.message
    }
  }

  const touchedElement = (id: string, label: string) => {
    if (id.toLowerCase() === 'name' && label.toLowerCase() === 'name')
      return touched.name
    else if (id.toLowerCase() === 'email' && label.toLowerCase() === 'email')
      return touched.email
    else {
      return touched.message
    }
  }

  const hasErrors = () => {
    if (errors.message || errors.email || errors.name) {
      return true
    } else {
      return false
    }
  }

  const handleClose = () => {
    setFormSubmitResponse('')
  }

  const context = {
    showAlert,
    inputValue,
    errorMessage,
    touchedElement,
    handleClose,
    hasErrors,
    handleSubmit,
    handleBlur,
    handleChange
  }
  return <FormContext.Provider value={context}>{children}</FormContext.Provider>
}
export const useFormContext = () => {
  const context = useContext(FormContext)
  return context
}
