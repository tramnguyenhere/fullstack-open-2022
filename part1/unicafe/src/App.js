import { useState } from 'react';
const Title = ({ title }) => <h1>{title}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ all, good, neutral, bad, positive, average }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={good + neutral + bad} />
        <StatisticLine
          text='average'
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticLine
          text='positive'
          value={(good / (good + neutral + bad)) * 100}
        />
      </tbody>
    </table>
  );
};

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
      <Statistics
        all='all'
        average='average'
        positive='positive'
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  );
};

export default App;
