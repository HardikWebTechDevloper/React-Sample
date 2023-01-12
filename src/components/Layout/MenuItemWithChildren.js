import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  MenuItem from './MenuItem';

class MenuItemWithChildren extends Component {

  constructor(props) {
    super(props);
    this.SubMenuClick = this.SubMenuClick.bind(this);
  }

  SubMenuClick = (event) => {
    event.preventDefault();
    const subMenu = event.target.nextSibling;
    const parent = event.target.parentElement;
    var width = window.innerWidth;
    if (width < 992) {
        if (subMenu) subMenu.classList.toggle('open');
        if (parent) parent.classList.toggle('open');
    }
    return false;
  }
  render() {
    const item = this.props.item || {};

    return (
      <React.Fragment>
        <li className={item.class_name}>
          <Link to={item.url} onClick={this.SubMenuClick}>
            {item.icon && <i className={item.icon}></i>}
            {item.label}
          </Link>
          <ul className="submenu">
            {item.children.map((child, i) => {
              if (child.children) {
                return <MenuItemWithChildren item={child} key={i} />
              } else {
                return <li key={i}> <MenuItem item={child} /></li>
              }
            })}
          </ul>
        </li>
      </React.Fragment>
    );
  }
}


export default (MenuItemWithChildren);
















