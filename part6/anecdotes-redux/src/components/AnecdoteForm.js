import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    props.addAnecdote(content);
    props.handleNotification(`You created "${content}"`, 10);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addAnecdote: (value) => dispatch(addAnecdote(value)),
  handleNotification: (value) => dispatch(handleNotification(value)),
});

export default connect(null, mapDispatchToProps)(AnecdoteForm);
