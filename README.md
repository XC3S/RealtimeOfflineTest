#Dev Server

ng serve --host 0.0.0.0 --port 8080 --disableHostCheck

#Project
##What ive done

###Angular Project

`npm install -g @angular/cli`

`ng new my-dream-app`

`cd my-dream-app`


### Amplify CLI Setup

`npm install -g @aws-amplify/cli`

`amplify configure`

=> create account with link


### Init Amplify project

`npm install aws-amplify aws-amplify-angular`
`amplify init`

#### Polyfills
```
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
(window as any).Buffer = (window as any).Buffer || require('buffer').Buffer;
```

#### src/tsconfig.app.json
```
"compilerOptions": {
    "types" : ["node"]
}
```

#### main.ts
```
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

#### src/app/app.module.ts 
```
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
```



### add api

add a simple graphql api to generate a model

`amplify add api`

(graphql everything default, updated later)

modify schema.graphql under amplify/backend/<project>/

### generate models

`amplify codegen models`

### Usage

`npm i @aws-amplify/core @aws-amplify/datastore`

```
import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Todo } from "./models";
```

implements the application to work completle local, cloudsync is the next step

## Cloud Sync

### update auth method to cognito user pools

`amplify add auth`

-> Default Configuation
-> email
-> no, im done

### update your api to use cognito

`amplify update api`

-> GrapthQL
-> Amazon Cognito User Pools
-> Yes, I want to make some additional changes
-> N (no addtional auth types)
-> y (conflict resolution strategy)
-> Optimistic Concurrency
-> y (override model)
-> toggle all your models and continue
-> select "Optimistic Concurrency" for every model

### push changes

`amplify push`

Do you want to generate code for your GraphQL API?
-> n (because we use datastore, not the api directly)

## implement authenticator 

app.components.ts
``` 
export class AppComponent implements OnInit {
  usernameAttributes = "email"; 
```

app.components.html
```
<amplify-authenticator [usernameAttributes]="usernameAttributes"></amplify-authenticator>
``` 