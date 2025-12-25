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

