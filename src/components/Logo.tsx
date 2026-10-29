import logoUrl from '../assets/hmbLogo.png'
import { cn } from '../lib/cn.ts'

export type LogoSize = 'sm' | 'md' | 'lg'

export interface LogoProps {
  size?: LogoSize
  /** Nombre accesible del logo. */
  title?: string
  /** Oculta el logo a tecnologías de asistencia (p. ej. si un encabezado ya lo nombra). */
  decorative?: boolean
  className?: string
}

const sizeClasses: Record<LogoSize, string> = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-20',
}

export function Logo({ size = 'md', title = 'HM Brandt Demolition', decorative = false, className }: LogoProps) {
  return (
    <span className={cn('inline-flex', className)}>
      <img
        src={logoUrl}
        alt={decorative ? '' : title}
        width={767}
        height={251}
        className={cn('w-auto shrink-0 select-none', sizeClasses[size])}
        draggable={false}
      />
    </span>
  )
}
