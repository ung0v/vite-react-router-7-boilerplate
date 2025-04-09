/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

import { ConfirmModal } from '@/components/modal/ConfirmModal'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'

export interface IDialogOptions {
  type?: 'error' | 'success'
  title?: React.ReactNode
  message?: React.ReactNode
  cancelText?: string
  confirmText?: string
  okText?: string
  onOK?: () => void | Promise<any>
  onCancel?: () => void
  onAfterOK?: () => void
  confirmLoading?: boolean
  component?: React.ReactNode
  footerClassName?: string
}

export interface IDialogContext {
  options: IDialogOptions

  show: (options: IDialogOptions) => Promise<boolean>
  close: () => void
  confirm: () => void
}

const DialogContext = createContext<IDialogContext | undefined>(undefined)

/**
 * The DialogProvider component is a context provider that wraps the entire
 * application and provides a dialog context to its children.
 *
 * @param {PropsWithChildren} props - The component props.
 * @return {JSX.Element} The DialogProvider component.
 */
export default function DialogProvider({ children }: PropsWithChildren) {
  // Create a reference to store the promise resolver function.

  const promiseInfo = useRef<(value: boolean | PromiseLike<boolean>) => void>(
    () => {},
  )
  const containerRef = useRef<any>(null)

  // State to control the open state of the dialog.
  const [open, setOpen] = useState(false)

  // State to store the options for the dialog.
  const [options, setOptions] = useState<IDialogOptions>({})

  // Close the dialog when clicking outside of it.
  useOnClickOutside(containerRef, () => {
    onClose()
  })

  /**
   * The handleDialog function is used to open the dialog and set its options.
   *
   * @param {IDialogOptions} options - The options for the dialog.
   * @return {Promise<boolean>} A promise that resolves to a boolean value.
   */
  const handleDialog = useCallback((options: IDialogOptions) => {
    return new Promise<boolean>((resolve) => {
      // Set the promise resolver function.
      promiseInfo.current = resolve

      // Open the dialog.
      setOpen(true)

      // Set the dialog options.
      setOptions(options)
    })
  }, [])

  /**
   * The onConfirm function is called when the confirm button is clicked.
   * It resolves the promise with a value of true and closes the dialog.
   */
  function onConfirm() {
    setOpen(false)
    promiseInfo.current(true)
    promiseInfo.current = () => {}

    // fix pointer events none when open dialog in dropdown then close
    // reference: https://github.com/radix-ui/primitives/issues/2122
    setTimeout(() => (document.body.style.pointerEvents = ''), 0)
  }

  /**
   * The onClose function is called when the close button is clicked.
   * It resolves the promise with a value of false and closes the dialog.
   */
  function onClose() {
    setOpen(false)
    promiseInfo.current(false)
    promiseInfo.current = () => {}

    // fix pointer events none when open dialog in dropdown then close
    // reference: https://github.com/radix-ui/primitives/issues/2122
    setTimeout(() => (document.body.style.pointerEvents = ''), 0)
  }

  // Create the dialog context value.
  const value: IDialogContext = useMemo(
    () => ({ options, show: handleDialog, close: onClose, confirm: onConfirm }),
    [options, handleDialog],
  )

  // Render the children wrapped in the dialog context provider.
  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog open={open}>
        <DialogTitle />
        <DialogContent
          ref={containerRef}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {options.component || <ConfirmModal />}
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('`useDialog` should be used within a `DialogProvider`')
  }

  return context
}
