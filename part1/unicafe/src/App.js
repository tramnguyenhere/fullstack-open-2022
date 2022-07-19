import { useState } from 'react';
const Title = ({ title }) => <h1>{title}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const Statistics = ({ text, value }) => (
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
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <Title title='give feedback' />
      <Button onClick={setToGood} text='good' />
      <Button onClick={setToNeutral} text='neutral' />
      <Button onClick={setToBad} text='bad' />
      <Title title='statistics' />
      <Statistics text='good' value={good} />
      <Statistics text='neutral' value={neutral} />
      <Statistics text='bad' value={bad} />
      <Statistics text='all' value={total} />
      <Statistics text='average' value={average} />
      <Statistics text='positive' value={`${positive}%`} />
    </div>
  );
};

export default App;
