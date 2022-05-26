import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import emailjs from '@emailjs/browser'

type ContextTypes = {
  handleClose: () => void
  sendEmail: (
    e: React.FormEvent<HTMLFormElement>,
    form: React.MutableRefObject<HTMLFormElement>
  ) => void
  open: boolean
}

export const ComponentContext = createContext<ContextTypes>({
  sendEmail: {} as any,
  handleClose: {} as any,
  open: false
})

export const ComponentContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [result, setResult] = useState<string>()
  const [open, setOpen] = useState<boolean>(false)

  const sendEmail = (
    e: React.FormEvent<HTMLFormElement>,
    form: React.MutableRefObject<HTMLFormElement>
  ) => {

    emailjs
      .sendForm(
        'service_hls8udj',
        'template_exwu0j3',
        form.current,
        'MFuEKG7t77Brf5kGM'
      )
      .then(
        result => {
          setResult(result.text)
        },
        error => {
          console.log(error.text)
        }
      )

    form.current.reset()
  }

  const handleClose = () => {
    setResult('')
  }

  useEffect(() => {
    result === 'OK' ? setOpen(true) : setOpen(false)
  }, [result])

  const context = {
    handleClose,
    open,
    sendEmail
  }

  return (
    <ComponentContext.Provider value={context}>
      {children}
    </ComponentContext.Provider>
  )
}

export const useComponentContext = () => {
  const context = useContext(ComponentContext)
  return context
}
