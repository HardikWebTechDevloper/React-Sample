
const menuList = [
    {
        url: "/#", label: "User Management", icon: "ti-user", class_name: "has-submenu ml-1",
        children: [
            {
                url: "/#", label: "Users", class_name: "has-submenu",
                children: [
                    { url: "/users/new", label: "Add" },
                    { url: "/users", label: "View" },
                ]
            },
        ]
    }
];

export default menuList;