//Users
import UsersList from './pages/Users';
import UsersCreate from './pages/Users/user-create';

const routes = [
    //Users
    { path: '/users/new', component: UsersCreate, ispublic: true },
    { path: '/users', component: UsersList, ispublic: true },

    // Dashboard
    { path: '/', component: UsersList, ispublic: true },
];

export default routes;