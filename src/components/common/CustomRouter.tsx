import { useLayoutEffect, useState } from "react";
import { BrowserRouterProps, Router } from "react-router-dom";
import { BrowserHistory } from "history";
import React from "react";
import customHistory from "../../utils/history";
interface Props extends BrowserRouterProps {
  history: BrowserHistory;
}
export const CustomRouter = ({ basename, history, children }: Props) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <Router navigator={customHistory} location={state.location} navigationType={state.action} basename={basename}>
      {children}
    </Router>
  );
};
