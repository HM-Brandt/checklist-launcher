import type { ComponentType } from 'react'
import {
  ButtonLink,
  Card,
  CheckIcon,
  ChecklistIcon,
  IssueIcon,
  Logo,
  type ButtonVariant,
  type IconProps,
} from './components/index.ts'
import { getEquipmentFromUrl, getLink, type LinkKey } from './config/links.ts'
import { useTransientValue } from './hooks/useTransientValue.ts'

const OPENED_FEEDBACK_MS = 1500

// Los datos llegan una sola vez desde el código QR y no cambian sin recargar la página.
const equipment = getEquipmentFromUrl()

interface LaunchAction {
  key: LinkKey
  variant: ButtonVariant
  Icon: ComponentType<IconProps>
}

const actions: readonly LaunchAction[] = [
  { key: 'checklist', variant: 'primary', Icon: ChecklistIcon },
  { key: 'issue', variant: 'secondary', Icon: IssueIcon },
]

export default function App() {
  const [openedKey, markOpened] = useTransientValue<LinkKey>(OPENED_FEEDBACK_MS)

  return (
    <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-112 w-3xl -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand-500/15 blur-3xl"
      />

      <Card aria-labelledby="app-title" className="w-full max-w-md p-8 text-center sm:p-10">
        <Logo size="lg" />

        <h1
          id="app-title"
          className="mt-6 text-2xl font-semibold tracking-tight text-balance text-neutral-900 sm:text-3xl"
        >
          QR Code Launcher
        </h1>
        <p className="mt-2 text-sm/6 text-pretty text-neutral-600">
          Open the checklist or report an issue in one click.
        </p>

        {equipment ? (
          <>
            <nav aria-label="Actions" className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map(({ key, variant, Icon }) => {
                const link = getLink(key, equipment)
                const isOpened = openedKey === key

                return (
                  <ButtonLink
                    key={key}
                    href={link.href}
                    title={link.description}
                    variant={variant}
                    size="lg"
                    fullWidth
                    className="sm:flex-1"
                    leftIcon={<Icon className="size-5" />}
                    rightIcon={
                      isOpened ? <CheckIcon className="size-4 animate-pop-in motion-reduce:animate-none" /> : undefined
                    }
                    onClick={() => markOpened(key)}
                  >
                    {isOpened ? 'Opened' : link.label}
                  </ButtonLink>
                )
              })}
            </nav>

            <p className="mt-6 text-xs text-neutral-500">
              {[equipment.name, equipment.number].filter(Boolean).join(' · ') || 'Equipment'}
              <span className="text-neutral-400"> · ID {equipment.id}</span>
            </p>
          </>
        ) : (
          <p role="alert" className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            No equipment ID found. Please scan the equipment's QR code again.
          </p>
        )}

        <p aria-live="polite" className="sr-only">
          {openedKey && equipment ? getLink(openedKey, equipment).openedMessage : ''}
        </p>
      </Card>
    </main>
  )
}
