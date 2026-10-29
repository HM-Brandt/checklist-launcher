import { cn } from '../lib/cn.ts'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const baseClasses = [
  'group inline-flex items-center justify-center gap-2 rounded-xl border font-semibold whitespace-nowrap select-none',
  'transition duration-150 ease-out',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
  'active:scale-[0.97]',
  'disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60',
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100',
].join(' ')

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'border-transparent bg-brand-600 text-white shadow-md shadow-brand-600/25',
    'hover:-translate-y-px hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-600/30',
    'active:translate-y-0 active:shadow-sm',
  ].join(' '),
  secondary: [
    'border-neutral-900 bg-transparent text-neutral-900',
    'hover:bg-neutral-900 hover:text-white active:bg-black',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonStyleProps & { className?: string }): string {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], fullWidth && 'w-full', className)
}
