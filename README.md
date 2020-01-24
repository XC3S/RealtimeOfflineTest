#Dev Server

ng serve --host 0.0.0.0 --port 8080 --disableHostCheck


##What ive done

###Angular Project

npm install -g @angular/cli

ng new my-dream-app

cd my-dream-app


### Amplify CLI Setup

npm install -g @aws-amplify/cli

amplify configure

=> create account with link


### Init Amplify project

npm install aws-amplify aws-amplify-angular 
amplify init

#### Polyfills

(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};


#### src/tsconfig.app.json

"compilerOptions": {
    "types" : ["node"]
}

#### src/app/app.module.ts 

import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

@NgModule({
  ...
  imports: [
    ...
    AmplifyAngularModule
  ],
  ...
  providers: [
    ...
    AmplifyService
  ]
  ...
});





### add api

add a simple graphql api to generate a model

amplify add api

(graphql everything default, updated later)

modify schema.graphql under amplify/backend/<project>/

### generate models

amplify codegen models

### Usage

npm i @aws-amplify/core @aws-amplify/datastore

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Todo } from "./models";

