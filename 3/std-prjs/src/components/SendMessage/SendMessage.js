import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Student from '../Students/Student';
import Group from '../Groups/Group';
import Popup from '../Popup/Popup';



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
      <Popup text='OH SHIDDDD' duration="1000" show={popup} onClear={() => setPopup(false)}  />
      <div>{thing}</div>
      <form onSubmit={onSubmit}>
        <textarea
          id='group-description'
          rows='5'
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          required
        />

        <button>Send</button>
      </form>
    </div>
  );
};

export default SendMessage;
