import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

class MenuWithMega extends Component {

    constructor(props) {
        super(props);
        this.MenuClick = this.MenuClick.bind(this);
        this.SubMenuClick = this.SubMenuClick.bind(this);
    }

    MenuClick = (event) => {
        var width = window.innerWidth;
        if (width < 992) {
            this.props.ToggleRedux();
        }
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
                    <ul className="submenu megamenu">
                        {item.children.map((child, i) => {
                            return <li key={i}>
                                <ul>
                                    {child.children.map((child1, j) => {
                                        return <li key={j}> <MenuItem item={child1} /></li>
                                    })}
                                </ul>
                            </li>
                        })}
                    </ul>
                </li>
            </React.Fragment>
        );
    }
}

export default (MenuWithMega);
