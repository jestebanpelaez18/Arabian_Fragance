.PHONY: format lint typecheck dev build start

format:
	npm run format -- --write

lint:
	npm run lint

typecheck:
	npm run typecheck

dev:
	npm run dev

build:
	npm run build && npm run start

e2e:
    npx playwright test

e2e-headed:
    npx playwright test --headed

e2e-ui:
    npx playwright test --ui

# Abre el último reporte HTML
report:
    npx playwright show-report