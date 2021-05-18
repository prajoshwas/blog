import api from '../utils/api';

export async function checkUserInfo(details) {
  let error = {type: 'app', message: 'Something went wrong'};
  try {
    let payload = {
      route: 'check-info',
      data: details,
    };
    let response = await api.post(payload);
    if (!response.data.error) {
      return response.data;
    }
  } catch (err) {
    throw error;
  }
}

export async function signInWithGoogle(user) {
  let error = {type: 'app', message: 'Something went wrong'};
  try {
    let payload = {
      route: 'signIn-withGoogle',
      data: user,
    };
    let response = await api.post(payload);
    if (!response.data.error) {
      return response.data;
    }
  } catch (err) {
    throw error;
  }
}

export async function addNewUser(user) {
  let error = {type: 'app', message: 'Something went wrong'};
  try {
    let payload = {
      route: 'addNewUser',
      data: user,
    };
    let response = await api.post(payload);
    if (!response.data.error) {
      return response;
    }
  } catch (err) {
    throw error;
  }
}
