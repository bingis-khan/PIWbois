import React, { useEffect, useState, useMemo, useReducer } from 'react';

import './App.css';

import StudentSearch from './components/Students/StudentSearch';
import GroupSearch from './components/Groups/GroupSearch';
import Navigation from './components/Navigation/Navigation';
import Add from './components/Add/Add';
import SendMessage from './components/SendMessage/SendMessage';
import Login from './components/Login/Login';
import User from './Context';
import { newImageURL } from './Images';
import Profile from './components/Profile/Profile';
import Following from './components/Follow/Following';
import Edit from './components/Add/Edit';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { firestore } from './firebase/init';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';


// Kinda bad - we can't really check the *real* base URL, so this
// constant mitigates it.
const baseURL = '/PIWbois/6/std-prjs/build';


// Helps me store (((persistent))) data.
const useLocalItems = (storageName, defaults) => {
  const [item, setItems] = useState(JSON.parse(localStorage.getItem(storageName)) ?? defaults);
  const addItem = (item) => setItems(items => {
    const newItems = [...items, item];

    localStorage.setItem(storageName, JSON.stringify(newItems));
    return newItems;
  });

  const newSetItems = (items) => {
    setItems(items);
    localStorage.setItem(storageName, JSON.stringify(items));
  };

  return [item, addItem, newSetItems];
};

const followReducer = (state, action) => {
  let stc = { students: new Set(state.students), groups: new Set(state.groups) }

  let followSet;
  switch (action.in) {
    case 'student':
      followSet = stc.students;
      break;

    case 'group':
      followSet = stc.groups;
      break;

    default:
      throw new Error(`Invalid dispatch type ${action.in}.`);
  }

  switch (action.do) {
    case 'add':
      followSet.add(action.value);
      break;

    case 'remove':
      followSet.delete(action.value);
      break;

    default:
      throw new Error(`Invalid action ${action.do}.`);
  }

  return stc;
}



function App() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);

  const addStudent = (student) => {
    try {
      addDoc(collection(firestore, 'students'), student).then(dr => setStudents(ss => [{ uid: dr.id, ...student }, ...ss]));
    } catch (err) {
      alert(err);
    }
  };

  const addGroup = async (group) => {
    try {
      await addDoc(collection(firestore, 'groups'), group).then(dr => setGroups(gs => [{ uid: dr.id, ...group }, ...gs]));
    } catch (err) {
      alert(err);
    }
  }

  const editStudent = async (student, i) => {
    const { uid, ...noUIDStudent } = student;

    console.log('edit student', uid, noUIDStudent);
    
    try {
      const q = doc(firestore, "students", student.uid);
      
      await updateDoc(q, noUIDStudent).then(() => setStudents(ss => {
        const newSS = [...ss];
        newSS[i] = student;

        return newSS;
      }));
    } catch (err) {

      // Most likely insufficient permissions.
      alert(err);
    }
  }

  const editGroup = async (group, i) => {
    const { uid, ...noUIDGroup } = group;

    console.log('edit group', uid, noUIDGroup);
    
    try {
      const q = doc(firestore, "groups", group.uid);
      
      await updateDoc(q, noUIDGroup).then(() => setGroups(gs => {
        const newGS = [...gs];
        newGS[i] = group;

        return newGS;
      }));
    } catch (err) {
      alert(err);
    }
  }

  // User.
  const [currentUserArr, , setUsers] = useLocalItems('currentUser', []);
  const [users, addUser] = useLocalItems('users', []);

  const setUser = (user) => setUsers([user]);
  const currentUser = currentUserArr[0] ?? null;
  console.log(currentUser);

  // We use a global follow list, because... I'm just tired, man.
  const [follows, dispatch] = useReducer(followReducer, { students: new Set(), groups: new Set() });

  // I hate myself.
  const [, setRefresh] = useState(false);
  const forceRefresh = () => setRefresh((s) => !s);

  const userContext = useMemo(
    () => ({ currentUser, setUser, users, addUser, follows, dispatch, refresh: forceRefresh }),
    [currentUser, users, follows]
  );

  const thenRedirect = (f, to) => (...args) => {
    f(...args);
    navigate(to);
  }

  // Fetch "external" data.
  const fetchJSON = async (filename) => {
    try {
      const response = await fetch(`${baseURL}/data/${filename}`);

      return response.ok
        ? await response.json()
        : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  useEffect(() => {
    const fetchStudents = async () => {
      const qs = await getDocs(collection(firestore, 'students'));
      const students = [];
      qs.forEach(dd => students.push( { uid: dd.id, ...dd.data() } ));

      const studentsWithPic = await Promise.all(students.map(async s => {
        if (!s.img) {
          const img = await newImageURL();
          return { ...s, img: img };
        } else {
          return s;
        }
      }));

      setStudents(studentsWithPic);
    }

    const fetchGroups = async () => {
      const qs = await getDocs(collection(firestore, 'groups'));
      const groups = [];
      qs.forEach(dd => groups.push( { uid: dd.id, ...dd.data() } ));

      console.log('set groups: ', groups);
      setGroups(groups);
    }

    fetchStudents();
    fetchGroups();
  }, []);  // Empty on purpose - the suggestion "setGroups" and "setStudents" is *wrong* - this causes a rerendering loop, where data is fetched constantly.

  return (
    <User.Provider value={userContext}>
      <div className='App'>
        <header>
          <Navigation />
        </header>

        <main>
          <Routes>
            <Route path='/students' element={<StudentSearch elems={students} />} />
            <Route path='/groups' element={<GroupSearch elems={groups} />} />
            <Route path='/add' element={<Add onNewStudent={thenRedirect(addStudent, '/students')} onNewGroup={thenRedirect(addGroup, '/groups')} students={students} />} />
            <Route path='/edit/:type/:id' element={<Edit students={students} groups={groups} onStudentEdit={thenRedirect(editStudent, '/students')} onGroupEdit={thenRedirect(editGroup, '/groups')} />} />
            <Route path='/:type/:id/send' element={students && groups ? <SendMessage students={students} groups={groups} /> : <p>Loading st00d</p>} />
            <Route path='/login' element={<Login />} />
            <Route path='/:id/profile' element={students && <Profile students={students} />} />
            <Route path='/following' element={<Following students={students.filter(s => follows.students.has(s.name))} groups={groups.filter(g => follows.groups.has(g.name))} />} />

            {/* Default "site" is the student search. */}
            <Route exact path='/' element={<Navigate replace to='/students' />} />
          </Routes>
        </main>
      </div>
    </User.Provider>
  );
}

export default App;
