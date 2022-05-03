import { Link } from "react-router-dom";

const SendMessageButton = (props) => {
  return (
    <Link to={`/${props.type}/${props.to}/send`}>
      <button>Send message</button>
    </Link>
  );
};

export default SendMessageButton;
