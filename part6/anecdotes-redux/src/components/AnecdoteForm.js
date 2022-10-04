import React from 'react';
import { useDispatch } from 'react-redux';
import { addQuote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNewQuote = async (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    event.target.quote.value = '';
    const newNote = await anecdotesService.createNew(content);
    dispatch(addQuote(newNote));
    dispatch(handleNotification(`You created "${content}"`));
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
