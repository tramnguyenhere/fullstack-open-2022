import { useState } from 'react';
const Title = ({ title }) => <h1>{title}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const Display = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = () => {
    setGood(good + 1);
  };
  const setToNeutral = () => {
    setNeutral(neutral + 1);
  };
  const setToBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Title title='give feedback' />
      <Button onClick={setToGood} text='good' />
      <Button onClick={setToNeutral} text='neutral' />
      <Button onClick={setToBad} text='bad' />
      <Title title='statistics' />
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text='bad' value={bad} />
    </div>
  );
};

export default App;
