import { authService } from "fbase";
import React, { Profiler } from "react";
import { useHistory } from "react-router";

export default () => {
  const onLogOutClick = () => {
    const history = useHistory();
    authService.signOut();
    history.push('/');
  }
  return <><button onClick={onLogOutClick}>Log Out</button></>;
};