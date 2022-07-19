import { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log('value now', newValue);
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <button
        onClick={() => {
          setToValue(1000);
        }}
      >
        thousand
      </button>
      <button
        onClick={() => {
          setToValue(0);
        }}
      >
        reset
      </button>
      <button onClick={() => setToValue(value + 1)}>increment</button>
    </div>
  );
};

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return <>the app is used by pressing the buttons</>;
//   }
//   return <>button press history: {props.allClicks.join('')}</>;
// };

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>{text}</button>
// );

// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'));
//     setLeft(left + 1);
//   };

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'));
//     setRight(right + 1);
//   };

//   return (
//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text='Left' />
//       <Button handleClick={handleRightClick} text='Right' />
//       {right}
//       <br></br>
//       <History allClicks={allClicks} />
//     </div>
//   );
// };

// const App = () => {
//   const [clicks, setClicks] = useState({ left: 0, right: 0 });
//   const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 });

//   const handleRightClick = () =>
//     setClicks({ ...clicks, right: clicks.right + 1 });

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}> Left </button>
//       <button onClick={handleRightClick}> Right </button>
//       {clicks.right}
//     </div>
//   );
// };

// const Display = ({ counter }) => <>{counter}</>;

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
// //Event handler
// const App = () => {
//   const [counter, setCounter] = useState(0);
//   const increaseByOne = () => setCounter(counter + 1);
//   const decreaseByOne = () => setCounter(counter - 1);
//   const resetToZero = () => setCounter(0);

//   return (
//     <>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text='plus' />
//       <Button onClick={decreaseByOne} text='minus' />
//       <Button onClick={resetToZero} text='reset' />
//     </>
//   );
// };

export default App;
