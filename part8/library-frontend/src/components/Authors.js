import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const [searchAuthor, setSearchAuthor] = useState('');
  const [yearBorn, setYearBorn] = useState();
  const result = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: searchAuthor, setBornTo: parseInt(yearBorn, 10) },
    });

    setSearchAuthor('');
    setYearBorn('');
  };

  const handleAuthorSelect = (event) => {
    event.preventDefault();
    setSearchAuthor(event.target.value);
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={handleAuthorSelect}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={yearBorn}
            onChange={({ target }) => setYearBorn(target.value)}
          />
        </div>
        <button type='submit'>apply</button>
      </form>
    </div>
  );
};

export default Authors;
