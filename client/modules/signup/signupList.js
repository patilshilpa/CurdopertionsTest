import React, { PropTypes } from 'react';
//import { Link } from 'react-router';
import SignupListItem from './signupListItem';


function SignupList(props) {
  console.log("props values:", props);
  return (
    <div>
      {props.userList.map(userList => 
        ( <SignupListItem userList = {userList} key={userList._id} onDelete={() => props.handleDeleteList(userList._id)}/>)
        )}
    </div>
  );
}

SignupList.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.shape({
    fname: PropTypes.string.isRequired,
    lname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  })).isRequired,
   handleDeleteList: PropTypes.func.isRequired,
};

export default SignupList;
