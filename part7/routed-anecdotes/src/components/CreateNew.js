import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
const CreateNew = ({ addNew, setNotification }) => {
  const navigate = useNavigate();
  const anecdoteContent = useField('content');
  const anecdoteAuthor = useField('author');
  const anecdoteInfo = useField('info');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: anecdoteContent.value,
      author: anecdoteAuthor.value,
      info: anecdoteInfo.value,
      votes: 0,
    });
    setNotification(`a new anecdote "${anecdoteContent.value}" created!`);
    navigate('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name={anecdoteContent.name}
            value={anecdoteContent.value}
            onChange={anecdoteContent.onChange}
          />
        </div>
        <div>
          author
          <input
            name={anecdoteAuthor.name}
            value={anecdoteAuthor.value}
            onChange={anecdoteAuthor.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            name={anecdoteInfo.name}
            value={anecdoteInfo.value}
            onChange={anecdoteInfo.onChange}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
