
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

export const tokenVerify = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
        const decodedJwt = parseJwt(getToken());
        if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
            // Token đã hết hạn
            return false
        } else {
            // Token vẫn còn hiệu lực
            return true
        }
    }
}