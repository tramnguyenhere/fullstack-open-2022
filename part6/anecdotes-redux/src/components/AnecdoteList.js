import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteQuote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => state);

  const vote = (id) => {
    dispatch(voteQuote(id));
  };

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>votes</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
