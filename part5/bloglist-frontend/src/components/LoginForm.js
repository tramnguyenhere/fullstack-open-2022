import React from 'react';
import '../styles/loginform.css';
const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <h3 className='login-title'>Login to application</h3>
      <form onSubmit={handleLogin}>
        <div className='username'>
          username
          <input
            type='text'
            name='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className='password'>
          password
          <input
            type='password'
            name='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button className='login-submit' type='submit'>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
