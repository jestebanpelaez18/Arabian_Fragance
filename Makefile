.PHONY: format lint typecheck dev build start e2e setup e2e-headed e2e-ui report

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


setup:
	npx playwright install --with-deps

# Corre todos los tests E2E de Playwright
e2e:
	npx playwright test

e2e-headed:
	npx playwright test --headed

e2e-ui:
	npx playwright test --ui

report:
	npx playwright show-report