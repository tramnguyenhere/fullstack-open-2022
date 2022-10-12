import React from 'react';
import '../styles/loginform.css';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div className='login-form'>
      <h3 className='login-title'>Login to application</h3>
      <form onSubmit={handleLogin}>
        <div className='username'>
          username
          <input
            type='text'
            name='Username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className='password'>
          password
          <input
            type='password'
            name='Password'
            id='password'
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};
export default LoginForm;
