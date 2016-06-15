//add axios to package.json

import axios from 'axios';

export const POST_PROFILE = 'POST_PROFILE';
export const AUTHENTICATION = 'AUTHENTICATION';
export const LOG_OUT = 'LOG_OUT';
export const CREATE_GAME = 'CREATE_GAME';

export function postProfile (profile) {

 const url = `/post_profile`;

const postRequest = axios.post(url, profile);



  return {
    type: POST_PROFILE,
    payload: profile
  }
}

export function authFunc (authData) {
    return {
      type: AUTHENTICATION,
      payload: authData
    }

}

export function resetAuth () {
  return {
    type: LOG_OUT,
    payload: undefined
  }
}

export function createGame(props) {
  const request = axios.post('/games', props);
  return {
    type: CREATE_GAME,
    payload: request
  }
}