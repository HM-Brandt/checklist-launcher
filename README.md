# Checklist Launcher

Página estática con dos accesos directos: **Checklist** e **Issue**. Hecha con React 19, TypeScript, Vite y Tailwind CSS v4.

## Uso

```sh
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # tsc -b + build de producción en dist/
pnpm lint     # oxlint
```

## Configurar los enlaces

Las URLs y los textos están en [`src/config/links.ts`](src/config/links.ts).

## Estructura

```
src/
├── App.tsx                  # composición de la pantalla
├── index.css                # Tailwind + tema (@theme)
├── config/links.ts          # URLs y textos de los botones
├── hooks/useTransientValue.ts
├── lib/cn.ts                # clsx + tailwind-merge
└── components/              # Card, Logo, Button, ButtonLink, buttonVariants, icons
```
