.PHONY: format lint typecheck dev build start

format:
	npm run format

lint:
	npm run eslint

typecheck:
	npm run type-check

dev:
	npm run dev

build:
	npm run build

start:
	npm run start