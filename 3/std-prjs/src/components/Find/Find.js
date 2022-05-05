import classes from './Find.module.css';

const Find = (props) => {
  return (
    <select className={`${classes.find} ${props.className}`} name={props.name} required>
      {props.options.map((opt, i) => (
        <option key={props.name + '-select-' + i} value={i}>{opt}</option>
      ))}
    </select>
  );
};

export default Find;
