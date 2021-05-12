
const updatedUsers = (users, updatedUser) => {
    return users.map(user => {
        if (user._id === updatedUser._id){
            return updatedUser;
        }
        return user;
    })

};

const usersAfterDelete = (users, deletedUser) => {
    return users.filter(user => user.email !== deletedUser.email)
}

export default function userreducer(state = {}, action) {
    switch (action.type) {
        case 'Create': {
            return {
                users: [...state.users, ...[action.userObj]] ,
            }
        }
        case 'Update': {
            return {
                users: updatedUsers(state.users, action.updatedUser),
            }
        }
        case 'Delete': {
            return {
                users: usersAfterDelete(state.users, action.user),
            };
        }
        case 'Fetch': {
            return {
                users: action.users,
                noOfUsers: action.noOfUsers,
            }
        }
        case 'FetchAllCountries': {
            return {
                countries: action.countries
            }
        }
        default: {
            return state
        }
    }
}