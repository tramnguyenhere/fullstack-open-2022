import React from 'react';
import { useDispatch } from 'react-redux';
import { addQuote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNewQuote = (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    console.log(content);
    event.target.quote.value = '';
    dispatch(addQuote(content));
    dispatch(handleNotification(content));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewQuote}>
        <div>
          <input name='quote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
