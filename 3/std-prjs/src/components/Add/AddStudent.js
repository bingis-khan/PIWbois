import { useRef } from 'react';

const AddStudent = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();

    const student = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      description: descriptionRef.current.value,
      tags: tagsRef.current.value.split(),
      subjects: subjectsRef.current.value.split(),
    };

    console.log(student);

    props.onNewStudent(student);
  };

  // Just **ref** it up. I forgot JS has "limited" options when it comes to list creation. Basically: traverse (const useRef) [1..5]
  // We're not going to use state and this single source of truth thingy, becuase we don't need it - HTML validation is enough.
  const [nameRef, emailRef, descriptionRef, tagsRef, subjectsRef] = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='student-name'>Name:</label>
      <input id='student-name' type='text' ref={nameRef} required />

      <label htmlFor='student-email'>Email:</label>
      <input id='student-email' type='email' ref={emailRef} required />

      <label htmlFor='student-description'>Description:</label>
      <textarea
        id='student-description'
        rows='5'
        ref={descriptionRef}
        required
      />

      <label htmlFor='student-tags'>Tags:</label>
      <input id='student-tags' type='text' ref={tagsRef} required />

      <label htmlFor='student-subjects'>Subjects:</label>
      <input id='student-subjects' type='text' ref={subjectsRef} required />

      <button>Add the boi</button>
    </form>
  );
};

export default AddStudent;
