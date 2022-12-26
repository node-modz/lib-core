# lib-core

How to use this package:

**Step 1:**  Install Package

```
$ npm install @node-modz/lib-core
```

**Step 2:** Initializing Server

```
import Server from '@node-modz/lib-core'

Server().catch((e) => {
    console.error("ledgers-api error:", e);
});

```

**Step 3:** Create Authentication to APIs

```
import {Authorizer,  HttpConfigOptions} from '@node-modz/lib-core'

```
Add authorizer key  as below to app_configuration. 
```
http: {
    cors_allow_domains: process.env.HTTP_CORS_ALLOW_DOMAINS?.split(",") as string[],
    authorizer: Authorizer({url: "http://192.168.0.5:4000/oauth2/verify"})
} as HttpConfigOptions,

```
Use as middleware for API's that need to be authenticated
```
import {Container, HttpConfigOptions} from '@node-modz/lib-core'
  
const httpConfigOptions:HttpConfigOptions = Container.get('HttpConfigOptions');

app.use(httpConfigOptions.authorizer)

```

**Step 4:** Defining App config

```
Sample /src/app-config.ts

export const __prod__ = process.env.NODE_ENV === 'production'
export const __SERVER_CONFIG__ = {
    config : [
        {
            prop:'sample',   // Name of the Property key that need to be used from container (Depency injection)
            container_ref:'SampleConfigOptions'// Container identifier
        },
        

    ],
    setup: [
        { init: "Sample Package" } //name of packages to be imported
    ],
    sample: {
        key1: "value 1",
    } as SampleConfigOptions // Configurations that need to be stored 

}


```
**Step 5:** Running Server

```
npm install && tsc
node dist/server.js --init dist/api-config.js
    
```

**Step 6:** Overwriting Default configuration


```
import {ServerConfigOptions,
    HttpConfigOptions,
    Authorizer} from "@node-modz/lib-core";



export const __prod__ = process.env.NODE_ENV === 'production'
export const __SERVER_CONFIG__ = {
    config : [
    
        {prop:'http',   container_ref:'HttpConfigOptions'},
        {prop:'server', container_ref:'ServerConfigOptions'},

    ],
    server: {
        host: "http://localhost:5000",
        port: 5000,
    } as ServerConfigOptions,
    http: {
        cors_allow_domains: process.env.HTTP_CORS_ALLOW_DOMAINS?.split(",") as string[],
        authorizer: Authorizer({url: "http://192.168.0.5:4000/oauth2/verify"})
    } as HttpConfigOptions



}

```
