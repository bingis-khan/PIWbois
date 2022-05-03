const Find = (props) => {
  return (
    <select name={props.name} required>
      {props.options.map((opt, i) => (
        <option key={props.name + '-select-' + i} value={i}>{opt}</option>
      ))}
    </select>
  );
};

export default Find;
