import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

function RouterView(props:any) {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Switch>
        {props.routes.map((item:any, index:number) => {
          return (
            <Route
              key={index}
              path={item.path}
              exact={item.exact}
              render={(props) =>
                item.redirect ? (
                  <Redirect push to={item.redirect} from={item.path} />
                ) : (
                  <item.component {...props} routes={item.children} />
                )
              }
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
export default RouterView;