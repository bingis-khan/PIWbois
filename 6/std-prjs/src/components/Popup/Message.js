import classes from './Popup.module.css';
import Card from '../UI/Card/Card';

const Message = ({ text }) => {
  return <Card className={classes.popup}>{text}</Card>;
}

export default Message;