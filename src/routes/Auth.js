import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {target:{name}} = event
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  } 
  
  return (
    <div>
      <AuthForm/>
      <div>
        <button onClick={onSocialClick}  name="google">Continue with Google</button>
        {/* <button>Continue with GitHub</button> */}
      </div>
    </div>
  )
}
export default Auth;