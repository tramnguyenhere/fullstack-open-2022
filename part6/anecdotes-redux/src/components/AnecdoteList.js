import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer';
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

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(handleNotification(`You voted "${anecdote.content}"`, 10));
  };

  return (
    <div>
      {sortedList.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>votes</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
