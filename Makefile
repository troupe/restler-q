.PHONY: test npm

npm:
	npm prune
	npm install

test:
	./node_modules/.bin/mocha test/

