import type { ComponentPropsWithRef } from 'react'
import { cn } from '../lib/cn.ts'

export type CardProps = ComponentPropsWithRef<'section'>

export function Card({ className, ...props }: CardProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-neutral-200/70 border-t-4 border-t-brand-500 bg-white/90 shadow-xl shadow-neutral-900/5 backdrop-blur-sm',
        className,
      )}
      {...props}
    />
  )
}
