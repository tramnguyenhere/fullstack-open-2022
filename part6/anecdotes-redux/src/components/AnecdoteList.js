import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteQuote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer';
const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  );

  const sortedList = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (id, content) => {
    dispatch(voteQuote(id));
    dispatch(handleNotification(`You voted "${content}"`));
  };

  return (
    <div>
      {sortedList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              votes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
