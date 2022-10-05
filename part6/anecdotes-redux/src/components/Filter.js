import { connect } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault();
    props.filterAnecdotes(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  filterAnecdotes: (value) => {
    dispatch(filterAnecdotes(value));
  },
});

export default connect(null, mapDispatchToProps)(Filter);
