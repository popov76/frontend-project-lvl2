install: install-deps
	npx simple-git-hooks

lint:
	npx eslint .

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8	

publish:
	npm publish	