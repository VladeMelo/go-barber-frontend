import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const direction = (location) =>
    // para mudar a logística de mostrar a rota em tela

    // user === true -> vc ja está logado, vai pro dashboard
    // user === false -> vc n está logado, vai pro login

    isPrivate === !!user ? (
      <Component />
    ) : (
      <Redirect
        to={{
          pathname: isPrivate ? '/' : '/dashboard',
          state: { from: location }, // para ñ perder o histórico
        }}
      />
    );

  return (
    <ReactDOMRoute {...rest} render={({ location }) => direction(location)} />
  );
};

export default Route;
