import actions from '../utils/contextAPI/action-types';
import api from '../utils/api';

export async function checkUserInfo(details) {
  let error = {type: 'app', message: 'Something went wrong'};
  try {
    let payload = {
      route: 'check-info',
      data: details,
    };
    let response = await api.post(payload);
    return response.data;
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

export async function checkUser(user) {
  let error = {type: 'app', message: 'Something went wrong'};
  try {
    let payload = {
      route: 'normal-check-user',
      data: user,
    };
    let response = await api.post(payload);
    if (!response.data.error) {
      return response.data;
    } else {
      return response;
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
      return response.data;
    }
  } catch (err) {
    throw error;
  }
}

export async function getRandomUsers(page) {
  let error = {type: 'app', message: 'Something went wrong'};
  try {
    let payload = {
      baseUrl: 'https://randomuser.me/api/',
      route: `?results=10&page=${page}`,
    };
    let response = await api.get(payload);
    if (response) {
      return response.data.results;
    }
  } catch (err) {
    throw error;
  }
}

export async function getAllBlogs() {
  let error = {type: 'app', message: 'Something went wrong'};
  try {
    let payload = {
      route: 'getBlogPosts',
    };
    let response = await api.get(payload);
    if (response) {
      return response.data;
    }
  } catch (err) {
    throw error;
  }
}

export async function likeBlogs(id, dispatch) {
  try {
    let payload = {
      route: `${id}/likeBlog`,
    };
    const {data} = await api.patch(payload);

    if (data) {
      let contextPayload = {
        type: actions.LIKE_BLOG,
        payload: data,
      };
      dispatch(contextPayload);
    }
  } catch (error) {
    throw error;
  }
}
