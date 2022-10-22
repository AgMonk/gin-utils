git add .
git commit -m "publish to npm"
npm version patch
echo f|xcopy package.json dist\package.json
cd dist
npm publish --access public
pause