import React, { useState } from 'react'

import { CircleAlertIcon, CircleCheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { __IS_DEV__ } from '@/constants'
import { useDialog } from '@/contexts/DialogProvider'
import { cn } from '@/utils'

import { Typography } from '../ui/typography'

export const ConfirmModal = () => {
  const { options, close, confirm } = useDialog()
  const [isLoading, setIsLoading] = useState<boolean>()

  function handleCancel() {
    options.onCancel?.()
    close()
  }

  async function handleConfirm() {
    const result = options?.onOK?.()
    if (result instanceof Promise) {
      setIsLoading(true)
      try {
        await result
        confirm()
        options.onAfterOK?.()
      } catch (error) {
        // eslint-disable-next-line no-console
        __IS_DEV__ && console.log(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      confirm()
    }
  }

  function renderIcon() {
    switch (options.type) {
      case 'error':
        return <CircleAlertIcon />
      case 'success':
        return <CircleCheckIcon />
      default:
        return <CircleCheckIcon />
    }
  }

  return (
    <div className="flex w-full flex-col gap-5 p-6">
      {options.type && (
        <div className="flex justify-center">
          {React.cloneElement(
            renderIcon() as React.ReactElement,
            {
              className: cn(
                'size-16 rounded-full mx-auto',
                renderIcon().props.className,
              ),
            } as React.HTMLAttributes<HTMLElement>,
          )}
        </div>
      )}
      {options.title && (
        <Typography className="text-text-001 whitespace-pre-line py-[7.5px]">
          {options.title}
        </Typography>
      )}
      <Typography className="text-text-002 whitespace-pre-line">
        {options.message}
      </Typography>
      <div className={cn('flex gap-2.5', options.footerClassName)}>
        <Button className="font-text-15m flex-1 px-0" onClick={handleCancel}>
          {options.cancelText ?? 'reject'}
        </Button>
        <Button
          loading={isLoading}
          className="font-text-15m min-w-0 flex-1"
          onClick={handleConfirm}
        >
          {options.okText ?? 'allow'}
        </Button>
      </div>
    </div>
  )
}
