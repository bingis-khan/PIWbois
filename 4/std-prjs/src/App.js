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

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';


// Kinda bad - we can't really check the *real* base URL, so this
// constant mitigates it.
const baseURL = '/PIWbois/3/std-prjs/build';


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
  const [students, addStudent, setStudents] = useLocalItems('students', null);
  const [groups, addGroup, setGroups] = useLocalItems('groups', null);

  // User.
  const [currentUserArr, , setUsers] = useLocalItems('currentUser', []);
  const [users, addUser] = useLocalItems('users', []);

  const setUser = (user) => setUsers([user]);
  const currentUser = currentUserArr[0] ?? null;
  console.log(currentUser);

  // We use a global follow list, because... I'm just tired, man.
  const [follows, dispatch] = useReducer(followReducer, { students: new Set(), groups: new Set() });

  const userContext = useMemo(
    () => ({ currentUser, setUser, users, addUser, follows, dispatch }),
    [currentUser, users, follows]
  );

  const thenRedirect = (f, to) => (arg) => {
    f(arg);
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
      const students = await fetchJSON('students.json');

      const studentsWithPic = await Promise.all(students.map(async s => {
        const img = await newImageURL();
        return { ...s, img: img };
      }));

      setStudents(studentsWithPic);
    }

    const fetchGroups = async () => {
      const groups = await fetchJSON('groups.json');
      setGroups(groups);
    }

    if (!students) fetchStudents();
    if (!groups) fetchGroups();
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
