import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Message from  './Message';


// This actuator thing is pretty bad :)
const Popup = ({ text, duration, show, onClear }) => {
  useEffect(() => {
    if (!show)
      return;
    
    setTimeout(() => {
      onClear();
    }, duration);
  }, [duration, show, onClear]);

  return ReactDOM.createPortal(
    show && <Message text={text} />, document.getElementById('popup-holder')
  ); 
}

export default Popup;