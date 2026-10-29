export type LinkKey = 'checklist' | 'issue'

/** Datos del equipo que llegan por la URL desde el código QR (p. ej. `?id=3&name=Telehandler&number=E50`). */
export interface Equipment {
  id: string
  name: string | null
  number: string | null
}

export interface LaunchLink {
  label: string
  href: string
  description: string
  /** Mensaje anunciado a lectores de pantalla tras pulsar el enlace. */
  openedMessage: string
}

const URLS = {
  equipmentChecklist: 'https://hm-brandt.github.io/equipment-checklist/',
  preTrip: 'https://hm-brandt.github.io/pre-trip/',
  issueReport: 'https://hm-brandt.github.io/issue-report/',
} as const

/** Lee los datos del equipo de la URL actual; `null` si falta el `id`. */
export function getEquipmentFromUrl(search: string = window.location.search): Equipment | null {
  const params = new URLSearchParams(search)
  const read = (key: string) => params.get(key)?.trim() || null

  const id = read('id')
  if (!id) return null

  return { id, name: read('name'), number: read('number') }
}

/** Los equipos cuyo número empieza por "E" usan el checklist de equipos; el resto, el pre-trip. */
export function usesEquipmentChecklist(equipment: Equipment): boolean {
  return /^E/i.test(equipment.number ?? '')
}

function buildUrl(baseUrl: string, params: Record<string, string | null>): string {
  const url = new URL(baseUrl)
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value)
  }
  return url.toString()
}

export function getLink(key: LinkKey, equipment: Equipment): LaunchLink {
  const { id, name, number } = equipment

  if (key === 'issue') {
    return {
      label: 'Issue',
      href: buildUrl(URLS.issueReport, { id, name, number }),
      description: 'Report an issue',
      openedMessage: 'Opening issue form',
    }
  }

  if (usesEquipmentChecklist(equipment)) {
    return {
      label: 'Checklist',
      href: buildUrl(URLS.equipmentChecklist, { id, name, number }),
      description: 'Open the checklist',
      openedMessage: 'Opening checklist',
    }
  }

  // El pre-trip solo recibe el id.
  return {
    label: 'Pre-trip Checklist',
    href: buildUrl(URLS.preTrip, { id }),
    description: 'Open the pre-trip inspection',
    openedMessage: 'Opening pre-trip inspection',
  }
}
