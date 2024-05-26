import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './header.css';

const navigation = [
  { name: 'Home', href: '/' },
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
        <NavLink to="/">
          <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='logo' className='logo' />
        </NavLink>
        <NavLink to="/">
        <h1 className='title'>DRExML results</h1>
        </NavLink>
      </div>

      <nav className='nav'>
        <ul>
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                exact={item.href === '/'} // Use exact only for the home link
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
