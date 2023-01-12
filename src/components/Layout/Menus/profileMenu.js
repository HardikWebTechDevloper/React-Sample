
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { mediaURL, getAPI } from "../../../helpers/authUtils";

// users
import userImg from '../../../images/users/admin.jpg';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            user: JSON.parse(localStorage.getItem('user')),
            picture: null
        };
        this.toggle = this.toggle.bind(this);
        this.profilePage = this.profilePage.bind(this);
    }

    componentDidMount() {
        (async () => {
            await this.getSingleData();
        })();
    }

    profilePage() {
        console.log('Calling')
        return <Redirect push to="/profile" />;
    }

    //Get Single Item Data
    async getSingleData() {
        try {
            let { user } = this.state;

            let response = await getAPI(`/admin/admin/${user.id}`);
            if (response.success) {
                this.setState({
                    picture: response.data.picture
                })
            } else {
                this.setState({
                    picture: null
                })
            }
        } catch (error) {
            this.setState({
                picture: null
            })
        }
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    render() {
        const { picture } = this.state;
        const avatar = (picture != null) ? mediaURL('user_file', picture) : userImg;

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="notification-list list-inline-item nav-pro-img mr-1" tag="li">
                    <DropdownToggle className="nav-link arrow-none nav-user" tag="a">
                        <img src={avatar} alt="user" className="rounded-circle" />
                    </DropdownToggle>
                    <DropdownMenu className="profile-dropdown" right>
                        <DropdownItem tag={Link} to="/profile">
                            <i className="mdi mdi-account-circle m-r-5"></i> Profile
                        </DropdownItem>
                        <div className="dropdown-divider"></div>
                        <DropdownItem tag={Link} className="text-danger" to="/logout"><i className="mdi mdi-power text-danger"></i> Logout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default withRouter(ProfileMenu);