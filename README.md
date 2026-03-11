
Projekt aplikacji obsługi call center na bazie Vue 3, Pinia, Tailwind, PrimeVue, Vitest

Uruchomienie:

```bash
docker compose up --build
```

Opcjonalnie można wygenerować typy API:

```bash
docker compose exec backend npm run generate-types
```

Testy:

```bash
docker compose exec frontend npm run test:unit
docker compose exec frontend npm run test:e2e -- --project=chromium
```

Raport z testów:

```bash
docker compose exec frontend npx playwright show-report --host 0.0.0.0
```