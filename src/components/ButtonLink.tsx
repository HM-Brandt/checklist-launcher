import type { ComponentPropsWithRef, ReactNode } from "react";
import { buttonVariants, type ButtonStyleProps } from "./buttonVariants.ts";
import { ExternalIcon } from "./icons.tsx";

export interface ButtonLinkProps
  extends ComponentPropsWithRef<"a">, ButtonStyleProps {
  href: string;
  /** Abre en una pestaña nueva, con `rel` seguro, icono y aviso para lectores de pantalla. */
  external?: boolean;
  leftIcon?: ReactNode;
  /** Sustituye al icono externo por defecto. */
  rightIcon?: ReactNode;
}

export function ButtonLink({
  variant,
  size,
  fullWidth,
  external = false,
  leftIcon,
  rightIcon,
  className,
  target,
  rel,
  children,
  ...props
}: ButtonLinkProps) {
  const trailingIcon =
    rightIcon ??
    (external && (
      <ExternalIcon className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
    ));

  return (
    <a
      className={buttonVariants({ variant, size, fullWidth, className })}
      {...props}
    >
      {leftIcon}
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
      {trailingIcon}
    </a>
  );
}
