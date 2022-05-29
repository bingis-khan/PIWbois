
import Card from '../UI/Card/Card';
import classes from './Student.module.css';

const Student = (props) => {
  const s = props.student;

  const img = s.img
    ? <img src={s.img}></img>
    : null;

  return (
    <Card className={classes['student-card']} >
      <h2>{s.name}</h2>
      <p>{s.description}</p>
      <p>Tags: {s.tags}</p>
      <p>Subjects: {s.subjects}</p>
      {img}
    </Card>
  );
};

export default Student;
