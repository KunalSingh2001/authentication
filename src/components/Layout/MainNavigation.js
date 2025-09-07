import React, {useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../Context/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const {token, setToken} = useContext(AuthContext);
  const history = useHistory()
  function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    setToken(null);
    history.replace('/auth');
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          
          {token ? (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={Logout}>Logout</button>
              </li>
            </>
          ):
          (<>
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          </> )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
