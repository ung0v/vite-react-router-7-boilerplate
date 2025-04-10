import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { LoaderIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactElement
  iconPosition?: 'left' | 'right'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size,
      asChild = false,
      loading = false,
      type = 'button',
      children,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    /**
     * Renders the children of the button, taking into account the loading state
     * and the presence of an icon.
     *
     * @returns The rendered children.
     */
    function renderChildren() {
      // If the button is in a loading state, render a loading dot instead of the children.
      if (loading) {
        return <LoaderIcon />
      }

      // If an icon and children are provided, render them in an array.
      if (icon) {
        // If only an icon is provided, render it as the only child.
        if (!children) {
          return icon
        }
        return (
          <span
            className={cn(
              // Apply flexbox styles for icon and child alignment.
              'flex items-center gap-2.5',
              // If the icon should be positioned to the right, apply flex-row-reverse.
              iconPosition === 'right' && 'flex-row-reverse',
            )}
          >
            {icon}
            {children}
          </span>
        )
      }

      // If no loading state or icon is present, simply render the children.
      return <span>{children}</span>
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          loading && 'pointer-events-none',
        )}
        ref={ref}
        type={type}
        {...props}
      >
        {renderChildren()}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
