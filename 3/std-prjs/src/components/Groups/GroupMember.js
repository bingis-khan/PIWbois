import Student from '../Students/Student';


const GroupMember = (props) => (
  <div>
    <h2>{props.role}</h2>
    <Student student={props.student} />
  </div>
);

export default GroupMember;