import Card from '../UI/Card/Card';
import classes from './Student.module.css';

const Student = (props) => {
  const s = props.student;
  return (
    <Card className={classes['student-card']}>
      <h2>{s.name}</h2>
      <p>{s.description}</p>
      <p>Tags: {s.tags}</p>
      <p>Subjects: {s.subjects}</p>
    </Card>
  );
};

export default Student;
