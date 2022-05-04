import Student from '../Students/Student';
import Card from '../UI/Card/Card';
import classes from './Group.module.css';

const GroupMember = (props) => (
  <Card className={classes['group-member']}>
    <h2>Role: {props.role}</h2>
    <Student student={props.student} />
  </Card>
);

export default GroupMember;