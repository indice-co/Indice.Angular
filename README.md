![alt text](icon/icon-64.png "Indice logo")
# Indice.Angular 
[![Build status](https://ci.appveyor.com/api/projects/status/jipfi4pj705u2jq8?svg=true)](https://ci.appveyor.com/project/cleftheris/indice-angular)

Indice extensions for Angular 2+ 

## Add reference to an internal library
In order to add reference to an internal library from the sample application one must add a referece via

`npm install "file://./dist/ng-auth"`

this will add to the root package.json that is tied with the sample app named 'app' a local reference to `@indice/ng-auth` like so:

[read more here](https://dev.to/jsanddotnet/create-an-angular-library-and-consume-it-locally-with-debugging-cma).
```json
 "dependencies": {
    //...
    "@indice/ng-auth": "file:dist/ng-auth",
    "@indice/ng-components": "file:dist/ng-components",
    //...
  },
```

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


## Pull requests review check-list
