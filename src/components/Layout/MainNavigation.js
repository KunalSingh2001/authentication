import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const {token} = useContext(AuthContext);

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
                <button>Logout</button>
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
