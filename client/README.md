# Archon Homepage

Responsive single-page Archon implementation for the R Web Solutions frontend
assessment. It uses Laravel, Inertia, Vue, TypeScript, and Tailwind CSS, with
server-backed quotation and newsletter forms.

## Local setup

```powershell
composer install
pnpm install
Copy-Item .env.example .env
php artisan key:generate
php artisan migrate
composer run dev
```

## Quality checks

```powershell
php artisan test
pnpm test:frontend
pnpm lint:check
pnpm types:check
pnpm build
vendor\bin\pint --test
vendor\bin\phpstan analyse --memory-limit=512M
```

The visual source of truth is `../Draft Homepage.png`; the implementation uses
the supplied assets from `../Resources`.
