import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';
// Export Constants
export const ADD_SIGNUP = 'ADD_SIGNUP';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

//action creamobilers
export function addUser(userDetails) {
  return {
    type: ADD_SIGNUP,
    userDetails,
  };
}

export function addSignUpRequest(userDetails) {
  return (dispatch) => {
    return callApi('userRegistration', 'post', {
      userDetails: {
        fname: userDetails.fname,
        lname: userDetails.lname,
        email: userDetails.email,
        password: userDetails.password,
        mobile: userDetails.mobile,
      },
    }).then(res => dispatch(addUser(res.userDetails)));
  };
}

export function searchList(userList) {
  return {
    type: ADD_POSTS,
    userList,
  };
}

export function fetchUserList() {
  return (dispatch) => {
    return callApi('userList').then(res => {
      dispatch(searchList(res.userList));
    });
  };
}
export function deleteList(_id) {
  return {
    type: DELETE_POST,
    _id,
  };
}

export function deleteListRequest(_id) {
  console.log(" _id ", _id);
  return (dispatch) => {
    return callApi(`deletePosts/${_id}`, 'delete').then(() => dispatch(deleteList(_id)));
  };
}