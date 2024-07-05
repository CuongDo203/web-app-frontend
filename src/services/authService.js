
export const setUserId = (userId) => {
    localStorage.setItem('user_id', userId)
}

export const getUserId = () => {
    return localStorage.getItem('user_id');
};

export const removeUserId = () => {
    localStorage.removeItem('user_id');
};

export const setRoleId = (roleId) => {
    localStorage.setItem('role_id', roleId)
}

export const getRoleId = () => {
    return localStorage.getItem('role_id');
};

export const removeRoleId = () => {
    localStorage.removeItem('role_id');
};