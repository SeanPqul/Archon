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

