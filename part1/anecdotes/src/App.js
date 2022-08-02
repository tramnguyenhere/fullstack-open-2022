import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  const [maxVoteIndex, setMaxVoteIndex] = useState();

  const handleQuote = () => {
    const newSelect = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelect);
  };

  const handleVotes = () => {
    const newVotes = [...votes]; //copy old array into a new one
    newVotes[selected]++;
    setVotes(newVotes);

    //Find max vote index
    const max = newVotes.indexOf(Math.max(...newVotes));
    setMaxVoteIndex(max);
  };

  return (
    <div>
      <h1>Anecdote</h1>
      {anecdotes[selected]}
      <br></br>
      <p>has {votes[selected]} votes</p>
      <br></br>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleQuote}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[maxVoteIndex]}
      <p>has {votes[maxVoteIndex]} votes</p>
    </div>
  );
};

export default App;
