import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addQuote(state, action) {
      state.push(action.payload);
    },
    voteQuote(state, action) {
      const id = action.payload;
      const quoteToChange = state.find((quote) => quote.id === id);
      const changedQuote = { ...quoteToChange, votes: quoteToChange.votes + 1 };
      return state.map((quote) => (quote.id !== id ? quote : changedQuote));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addQuote, voteQuote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
