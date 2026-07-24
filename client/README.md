# Archon Website

The Archon website presents its heavy-duty trucks, services, company details,
and contact options. It is built with Laravel, Inertia, Vue, TypeScript, and
Tailwind CSS.

## Run locally

```powershell
composer install
pnpm install
Copy-Item .env.example .env
php artisan key:generate
php artisan migrate
composer run dev
```

Open `http://127.0.0.1:8000` after the development server starts.

## Build for production

```powershell
pnpm build
```

## Optional quality checks

```powershell
php artisan test
pnpm test:frontend
pnpm lint:check
pnpm types:check
pnpm build
vendor\bin\pint --test
vendor\bin\phpstan analyse --memory-limit=512M
```
