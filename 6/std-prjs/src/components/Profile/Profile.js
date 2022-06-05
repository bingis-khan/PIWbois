import Student from "../Students/Student";
import { useParams } from "react-router-dom";


const Profile = (props) => {
    const { id } = useParams();

    const student = props.students[id];

    return !student
        ? <p>Invalid ID.</p>
        : <center><Student student={student} /></center>
};

export default Profile;