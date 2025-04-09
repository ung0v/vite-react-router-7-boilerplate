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

import { XIcon } from 'lucide-react'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'

export interface IDrawerOptions {
  title?: string
  component?: React.ReactNode
}

export interface IDrawerContext {
  options: IDrawerOptions

  show: (options: IDrawerOptions) => Promise<boolean>
  close: () => void
  confirm: () => void
}

const DrawerContext = createContext<IDrawerContext | undefined>(undefined)

/**
 * The DrawerProvider component is a context provider that wraps the entire
 * application and provides a Drawer context to its children.
 *
 * @param {PropsWithChildren} props - The component props.
 * @return {JSX.Element} The DrawerProvider component.
 */
export default function DrawerProvider({ children }: PropsWithChildren) {
  // Create a reference to store the promise resolver function.

  const promiseInfo = useRef<(value: boolean | PromiseLike<boolean>) => void>(
    () => {},
  )
  const containerRef = useRef<any>(null)

  // State to control the open state of the Drawer.
  const [open, setOpen] = useState(false)

  // State to store the options for the Drawer.
  const [options, setOptions] = useState<IDrawerOptions>({})

  useOnClickOutside(containerRef, () => {
    setOpen(false)
  })

  /**
   * The handleDrawer function is used to open the Drawer and set its options.
   *
   * @param {IDrawerOptions} options - The options for the Drawer.
   * @return {Promise<boolean>} A promise that resolves to a boolean value.
   */
  const handleDrawer = useCallback((options: IDrawerOptions) => {
    return new Promise<boolean>((resolve) => {
      // Set the promise resolver function.
      promiseInfo.current = resolve

      // Open the Drawer.
      setOpen(true)

      // Set the Drawer options.
      setOptions(options)
    })
  }, [])

  /**
   * The onConfirm function is called when the confirm button is clicked.
   * It resolves the promise with a value of true and closes the Drawer.
   */
  function onConfirm() {
    setOpen(false)
    promiseInfo.current(true)
    promiseInfo.current = () => {}

    // fix pointer events none when open Drawer in dropdown then close
    // reference: https://github.com/radix-ui/primitives/issues/2122
    setTimeout(() => (document.body.style.pointerEvents = ''), 0)
  }

  /**
   * The onClose function is called when the close button is clicked.
   * It resolves the promise with a value of false and closes the Drawer.
   */
  function onClose() {
    setOpen(false)
    promiseInfo.current(false)
    promiseInfo.current = () => {}

    // fix pointer events none when open Drawer in dropdown then close
    // reference: https://github.com/radix-ui/primitives/issues/2122
    setTimeout(() => (document.body.style.pointerEvents = ''), 0)
  }

  // Create the Drawer context value.
  const value: IDrawerContext = useMemo(
    () => ({ options, show: handleDrawer, close: onClose, confirm: onConfirm }),
    [options, handleDrawer],
  )

  // Render the children wrapped in the Drawer context provider.
  return (
    <DrawerContext.Provider value={value}>
      {children}
      <Drawer open={open}>
        <DrawerContent
          ref={containerRef}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>{options.title}</DrawerTitle>
            <span className="cursor-pointer p-2" onClick={onClose}>
              <XIcon className="[&_path]:fill-text-001 size-5" />
            </span>
          </DrawerHeader>

          {options.component}
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => {
  const context = useContext(DrawerContext)

  if (!context) {
    throw new Error('`useDrawer` should be used within a `DrawerProvider`')
  }

  return context
}
