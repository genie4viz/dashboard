import { NextContext } from 'next';
// tslint:disable-next-line:no-submodule-imports
import Router from 'next/router';

export default (context: NextContext, target: string) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};
