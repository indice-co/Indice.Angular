![alt text](icon/icon-64.png "Indice logo")
# Indice.Angular 
Indice extensions for Angular 2+ 

## To export a new component
1. Declare component in NgModule declarations.
2. Declare component in NgModule exports.
3. Add component's path in public-api.ts file.

## To publish a new version 
### ng-components
1. Navigate to projects\ng-components\package.json and change the version number.
2. `npm install`
3. `npm run build-components`
4. Navigate to dist\ng-components.
5. `npm publish`
### ng-auth
1. Navigate to projects\ng-components\package.json and change the version number.
2. `npm install`
3. `npm run build-auth`
4. Navigate to dist\ng-auth.
5. `npm publish`

## Using sample project to develop
### Getting Started
1. `npm install` on repo root folder
2. Open new terminal and run `npm run start-mock-server`
3. Open new terminal and run `npm run start-app`
4. Voila! Changes on libraries reflect on sample project