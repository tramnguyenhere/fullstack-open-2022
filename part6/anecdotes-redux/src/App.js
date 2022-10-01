import { useSelector, useDispatch } from 'react-redux';
import { voteQuote, addQuote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteQuote(id));
  };

  const addNewQuote = (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    console.log(content);
    event.target.quote.value = '';
    dispatch(addQuote(content));
  };

  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>votes</button>
          </div>
        </div>
      ))}
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

export default App;
