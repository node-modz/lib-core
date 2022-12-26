import { HttpConfigOptions } from "../config/HttpConfigOptions";
import { ServerConfigOptions } from "../config/ServerConfigOptions";

export const __DEFAULT_CONFIG__ = {
    config : [
        {prop:'server', container_ref:'ServerConfigOptions'},
        {prop:'http',   container_ref:'HttpConfigOptions'},
    ],
    setup: [
        { init: "../init-http"  },
    ],
    server: {
        host: "http://localhost:3000",
        port: 3000,
    } as ServerConfigOptions,
    http: {
        cors_allow_domains: process.env.HTTP_CORS_ALLOW_DOMAINS?.split(",") as string[]

    } as HttpConfigOptions,

}
