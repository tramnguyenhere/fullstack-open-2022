import React from 'react';
import '../styles.css';

const Message = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message.includes('ERROR')) {
    return <div className='message--error'>{message}</div>;
  } else {
    return <div className='message--success'>{message}</div>;
  }
};

export default Message;
