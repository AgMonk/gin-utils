git add .
git commit -m "publish to npm"
npm version patch
tsc
echo f |xcopy package.json dist\package.json
cd dist
npm publish --access public