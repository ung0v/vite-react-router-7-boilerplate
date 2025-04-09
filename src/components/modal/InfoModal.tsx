'use client'

import React from 'react'

import { CircleAlertIcon, CircleCheckIcon } from 'lucide-react'

import { useDialog } from '@/contexts/DialogProvider'
import { cn } from '@/utils'

import { Button } from '../ui/button'
import { Typography } from '../ui/typography'

export const InfoModal = () => {
  const { close, options } = useDialog()

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

  function handleOK() {
    close()
    options?.onOK?.()
  }

  return (
    <div className="flex w-full flex-col gap-5 p-6">
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
      <Typography className="text-text-001 py-2.5 text-center">
        {options.message}
      </Typography>
      <Button onClick={handleOK} variant={'default'} className="w-full">
        {options.okText}
      </Button>
    </div>
  )
}
