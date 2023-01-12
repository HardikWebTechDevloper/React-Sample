import React, { Component } from 'react';
// import LanguageMenu from './Menus/languageMenu';
import { Link, withRouter } from 'react-router-dom';
// import NotificationMenu from './Menus/notificationMenu';
import ProfileMenu from './Menus/profileMenu';
import { connect } from 'react-redux';

import logoLight from '../../images/logo-light.png';
import { ToggleRedux } from '../../store/actions';

import MenuItem from './MenuItem';
import MenuItemWithChildren from './MenuItemWithChildren';
import MenuWithMega from './MenuWithMega';

import data from './menuList';

class Topbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchtop: false
        };
        this.searchtoggle = this.searchtoggle.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.props.ToggleRedux(!this.props.is_large_state);
    }

    searchtoggle() {
        this.setState({
            searchtop: !this.state.searchtop
        });
    }



    toggleFullscreen() {
        if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    componentDidMount() {
        var width = window.innerWidth;
        if (width >= 768) { }
        else { this.toggleMenu(this.props.is_large_state); }

        var matchingMenuItem = null;
        var ul = document.getElementById("navigation");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = (item) => {

        item.classList.add('active');
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add('active'); // li 
            const parent2 = parent.parentElement;

            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add('active'); // li 
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add('active'); // li 
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add('active'); // li 
                    }
                }
            }
        }
        return false;
    }

    render() {
        return (
            <React.Fragment>
                <header id="topnav">
                    <div className="topbar-main">
                        <div className="container-fluid">
                            <div className="logo">
                                <Link to="/dashboard" className="logo">
                                    <img src={logoLight} alt="" className="logo-large" />
                                </Link>
                            </div>
                            <div className="menu-extras topbar-custom">
                                <ul className="navbar-right list-inline float-right mb-0">
                                    <li className="dropdown notification-list list-inline-item d-none d-md-inline-block">
                                        <form role="search" className="app-search">
                                            <div className="form-group mb-0">
                                                <input type="text" className="form-control" placeholder="Search.." />
                                                <button type="submit"><i className="fa fa-search"></i></button>
                                            </div>
                                        </form>
                                    </li>

                                    {/* <LanguageMenu /> */}

                                    {/* <li className="dropdown notification-list list-inline-item d-none d-md-inline-block mr-1">
                                        <Link onClick={this.toggleFullscreen} className="nav-link" to="#" id="btn-fullscreen">
                                            <i className="mdi mdi-fullscreen noti-icon"></i>
                                        </Link>
                                    </li> */}

                                    {/* <NotificationMenu /> */}
                                    <ProfileMenu />

                                    <li className="menu-item list-inline-item">
                                        <span className={this.props.is_large_state ? "navbar-toggle nav-link" : "navbar-toggle nav-link open"}>
                                            <div onClick={this.toggleMenu} className="lines">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>

                    <div className="navbar-custom">
                        <div className="container-fluid">

                            <div id="navigation" style={{ display: this.props.is_large_state ? "none" : "block" }}>
                                <ul className="navigation-menu">
                                    {data.map((item, i) => {
                                        if (item.is_mega) {
                                            return <MenuWithMega item={item} key={i} />
                                        }
                                        else {
                                            if (item.children)
                                                return <MenuItemWithChildren item={item} key={i} />
                                            else
                                                return <li key={i} className="has-submenu"> <MenuItem item={item} /></li>
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { is_large_state } = state.Layout;
    return { is_large_state };
}

export default withRouter(connect(mapStatetoProps, { ToggleRedux })(Topbar));

