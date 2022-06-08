import { Link } from "react-router-dom";
import Button from "./Button";

const LinkButton = (props) => {
  return (
    <Link to={props.to}>
      <Button>{props.text}</Button>
    </Link>
  );
};

export default LinkButton;
