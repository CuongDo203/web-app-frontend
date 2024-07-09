
export const getUserId = () => {
    return localStorage.getItem('user_id');
};

export const setUser = (user) => {
    localStorage.setItem('user', user)
}

export const getUser = () => {
    const user = localStorage.getItem('user')
    if(user === null || user === undefined){
        return null
    }
    return JSON.parse(user)
}

export const removeUser = () => {
    localStorage.removeItem('user')
}