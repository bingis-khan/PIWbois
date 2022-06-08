import { useParams } from "react-router-dom";
import AddGroup from "./AddGroup";
import AddStudent from "./AddStudent";

const Edit = (props) => {
    const params = useParams();
    const arrId = params.id;
    const which = params.type;
    
    const onStudentEdit = (student) => props.onStudentEdit(student, arrId);
    const onGroupEdit = (group) => props.onGroupEdit(group, arrId);

    return (   
        which === 'student' && <AddStudent text={'Edit Student'} prototype={props.students[arrId]} onNewStudent={onStudentEdit}/>
    ||  which === 'group' && <AddGroup text={'Edit Group'} prototype={props.groups[arrId]} onNewGroup={onGroupEdit} students={props.students} />
    ||  <p>wtf</p>
    );
};

export default Edit;
