import { useSelector } from 'react-redux';
import '../styles/notification.css';
const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }

  if (message.includes('ERROR')) {
    return <div className='message--error'>{message}</div>;
  } else {
    return <div className='message--success'>{message}</div>;
  }
};

export default Notification;
