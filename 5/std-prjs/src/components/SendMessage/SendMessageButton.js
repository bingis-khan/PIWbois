import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from './SendMessage.module.css';

const SendMessageButton = (props) => {
  return (
    <Link to={`/${props.type}/${props.to}/send`}>
      <Button className={`${classes.button} ${props.className}`}></Button>
    </Link>
  );
};

export default SendMessageButton;
