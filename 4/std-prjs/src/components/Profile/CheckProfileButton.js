import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const CheckProfileButton = (props) =>
    <Link to={`/${props.to}/profile`}>
        <Button>Check profile</Button>
    </Link>;

export default CheckProfileButton;