import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Student from '../Students/Student';
import Group from '../Groups/Group';
import Popup from '../Popup/Popup';
import classes from './SendMessage.module.css';
import Button from '../UI/Button/Button';


const SendMessage = (props) => {
  const { type, id } = useParams();
  const [message, setMessage] = useState('');
  const [popup, setPopup] = useState(false);

  const sendMessage = (message) => {
    setPopup(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  // Nice name.
  let thing = null;
  switch (type) {
    case 'student':
      thing = <Student student={props.students[+id]} />;
      break;

    case 'group':
      thing = <Group group={props.groups[+id]} />;
      break;

    default:
  }

  return (
    <div>
      <Popup text={`Message sent to ${type}.`} duration="2000" show={popup} onClear={() => setPopup(false)}  />
      <center>
        <div>{thing}</div>
        <form className={classes.form} onSubmit={onSubmit}>
          <textarea
            id='group-description'
            rows='5'
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            required
            
          />

          <br></br>
          <Button type='submit'>Send</Button>
        </form>
      </center>
    </div>
  );
};

export default SendMessage;
