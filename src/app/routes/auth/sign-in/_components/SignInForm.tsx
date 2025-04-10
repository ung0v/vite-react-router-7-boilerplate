'use client'

import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, PasswordInput } from '@/components/ui/input'
import Link from '@/components/ui/link'
import { ALL_ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

import {
  DEFAULT_VALUES_SIGN_IN_FORM,
  SignInFormSchemaType,
  signInFormSchema,
} from '../_schemas'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

export function SignInForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: DEFAULT_VALUES_SIGN_IN_FORM,
  })

  function onSubmit(data: SignInFormSchemaType) {
    setIsLoading(true)

    // eslint-disable-next-line no-console
    console.log(data)

    setTimeout(() => {
      setIsLoading(false)
      router.push(ALL_ROUTES.HOME)
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-muted-foreground hover:opacity-75"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2" loading={isLoading}>
              Login
            </Button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isLoading}
                icon={<IconBrandGithub className="h-4 w-4" />}
              >
                GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isLoading}
                icon={<IconBrandFacebook className="h-4 w-4" />}
              >
                Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
