import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './header.css';

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Results', href: '/results' },
  { name: 'Team', href: '/team' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Dataset Example', href: '/dataset-example' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Header() {
  const location = useLocation();

  return (
    <header className='header'>
      <div className='icon_title'>
        <NavLink to="/home">
          <img src='https://raw.githubusercontent.com/Neo0CE/TIA/main/drexml_logo_fav.svg' alt='logo' className='logo' />
        </NavLink>
        <NavLink to="/home">
       
        </NavLink>
      </div>

      <nav className='nav'>
        <ul>
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                exact={item.href === '/home'} // Use exact only for the home link
                to={item.href}
                className={classNames(
                  'nav-link',
                  location.pathname === item.href && 'current'
                )}
                aria-current={location.pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
