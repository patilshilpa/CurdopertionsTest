import { ADD_SIGNUP, ADD_POSTS, DELETE_POST } from './signupActions';

const initialState = {
	isRegistering: "True",
	isRegistered: "False",
	isRegisteredFailed: "False"
};

const signupReducers = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_SIGNUP':
			return Object.assign({},state,{
				
				isRegistering: "False",
				isRegistered: "True",
				isRegisteredFailed: "False",
				data: action.userDetails
			}
	     );
		case 'ADD_POSTS' :
      return {
        data: action.userList,
      };
       case 'DELETE_POST' :
      return {
        data: state.data.filter(userList => userList._id !== action._id),
      };

		default: 
			return state;
	}
}

export const getPosts = state => state.userList.data;

export const getPost = (state, _id) => state.posts.data.filter(post => post._id === _id)[0];

export default signupReducers;



