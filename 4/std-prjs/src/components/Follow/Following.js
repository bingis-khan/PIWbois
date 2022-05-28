import Card from "../UI/Card/Card";
import { extendedStudentCard } from "../Students/StudentSearch";
import { extendedGroupCard } from "../Groups/GroupSearch";

const Following = (props) =>
    <>
        <Card>
            <h1>Students</h1>
            {props.students.map(extendedStudentCard)}
        </Card>
        <Card>
            <h1>Groups</h1>
            {props.groups.map(extendedGroupCard)}
        </Card>
    </>;

export default Following;