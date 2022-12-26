import dotenv from 'dotenv-safe';
import minimist from 'minimist';
import Container from 'typedi';
import Logger from "@node-modz/lib-logger";

import initApp from "../init-context";
import { ServerConfigOptions } from '../config/ServerConfigOptions';
import {__DEFAULT_CONFIG__} from './default-config';


const logger = Logger(module);


const loadExternalLibaries = async (appCtxt: any, argv:any)=>{
  const file = argv["init"];
  const rfile = (file) ? process.cwd() + "/" + file.replace(/\.[^/.]+$/, "") : '';
  if ( !file ) {
    logger.error("server config missing: --init <file>")
    return;
  }
  logger.info("starting server using config:", rfile);

  const server = require(rfile).__SERVER_CONFIG__;

  /**
   * initialize the config in.
   */
  for ( const attr of server.config as {prop:string,container_ref:string}[] ) {

    Container.set(
        attr.container_ref,
        descendentProperty(server,attr.prop));
  }
  /**
   * bootup app.
   */
  for (const mod of server.setup as { init: string, config: string }[]) {
    await require(mod.init).default(appCtxt)
  }

}

const loadDefaultLibaries = async (appCtxt:any)=>{
  /**
   * initialize the config in.
   */
  for ( const attr of __DEFAULT_CONFIG__.config as {prop:string,container_ref:string}[] ) {
    Container.set(
        attr.container_ref,
        descendentProperty(__DEFAULT_CONFIG__,attr.prop));
  }
  /**
   * bootup app.
   */

  for (const mod of __DEFAULT_CONFIG__.setup as { init: string, config: string }[]) {
    await require(mod.init).default(appCtxt)
  }

}


const descendentProperty = (obj:any, desc:string) => {
  var arr = desc.split(".");
  while(arr.length && (obj = obj[arr.shift() as string]));
  return obj;
}



const main = async () => {
  dotenv.config();
  const argv = minimist(process.argv.slice(2));

  logger.info("start api-server:", __dirname);
  const appCtxt = initApp( "Node APIs");

  await loadDefaultLibaries(appCtxt);
  await loadExternalLibaries(appCtxt, argv);

  const serverConfig:ServerConfigOptions = Container.get('ServerConfigOptions')
  logger.info('ServerConfigOptions', serverConfig);

  appCtxt.http.use(function (err: any, req: any, res: any, next: any) {
    res.status(err.code|| err.status || 500)
        .json({
          code: err.name || err.statusText,
          httpCode: err.code || err.status,
          data: err.message || err.data

        });

  });

  appCtxt.http.listen(serverConfig.port, () => {
    logger.info("ledgers-api listening on: ", serverConfig.port);
  });
};



export default main;
