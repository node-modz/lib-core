import { AppContext } from "./AppContext";


const init = (name:string): AppContext => {
  const appCtxt = new AppContext();
  appCtxt.name = name
  return appCtxt
};

export { init as createAppContext }
export default init ;
