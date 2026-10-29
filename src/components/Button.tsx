import type { ComponentPropsWithRef, ReactNode } from 'react'
import { buttonVariants, type ButtonStyleProps } from './buttonVariants.ts'

export interface ButtonProps extends ComponentPropsWithRef<'button'>, ButtonStyleProps {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Button({
  variant,
  size,
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonVariants({ variant, size, fullWidth, className })} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
