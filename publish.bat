echo f|xcopy package.json dist\package.json /Y
cd dist
npm publish --access public 
del package.json
pause