import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  sub: number;
  exp: number;
  role: string;
}

const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

const validateToken = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getUserIdFromToken = (token: string): number | null => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.sub;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getAccessToken, validateToken, getUserIdFromToken };