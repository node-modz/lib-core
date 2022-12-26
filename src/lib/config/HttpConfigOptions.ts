import {Request, Response, NextFunction} from "express";

export type HttpConfigOptions = {
  cors_allow_domains?: string[],
  authorizer?: (request:Request, response:Response, next:NextFunction)=>{},
  views?: string;
  session: {
    redis_store: string;
    cookie_secret: string;
    cookie_name: string;
    cookie_max_age: number;
  };
};
