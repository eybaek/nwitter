import { authService } from "fbase";
import React, { useState } from "react";

const inputStyles = {};

const AuthForm = () => {
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

	const onChange = (event) => {
    // console.log(event.target.name)
    const {target: {name, value},} = event;
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async(event) => {
    event.preventDefault()
    try {
      let data
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password)
      } else {
        data = await authService.signInWithEmailAndPassword(email, password)
      }
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev)

	return (
	<>
		<form onSubmit={onSubmit} className="container">
			<input name="email" type="email" placeholder="Email" required value={email}  className="authInput" onChange={onChange}/>
			<input name="password" type="password" placeholder="Password" required value={password}  className="authInput" onChange={onChange}/>
			<input type="submit" className="authInput authSubmit" value={newAccount ? "Create Account" : "Log In"}  />
			{error}
		</form>
		<span onClick={toggleAccount} className="authSwitch" >{newAccount ? 'Sign in' : 'Create Account'}</span>
	</>	
	)
};

export default AuthForm;