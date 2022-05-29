import { useContext } from 'react';
import User from '../../Context';
import Button from '../UI/Button/Button';


const FollowButton = (props) => {
    const ctx = useContext(User);

    let follows;
    if (props.type === 'group')
        follows = ctx.follows.groups;
    else if (props.type === 'student')
        follows = ctx.follows.students;
    else
        throw new Error('Invalid type');

    const isFollowing = follows.has(props.who);
    const follow = () => {
        ctx.dispatch({ in: props.type, do: 'add', value: props.who });
    }

    const unfollow = () => {
        ctx.dispatch({ in: props.type, do: 'remove', value: props.who });
    }

    return isFollowing
        ? <Button onClick={unfollow}>Unfollow</Button>
        : <Button onClick={follow}>Follow</Button> 
};

export default FollowButton;