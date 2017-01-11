import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';

function userList(props) {
return (
<div>
<table class="table table-bordered">
                 <thead>
                  <tr>
                <th>FirstName</th>&nbsp;&nbsp;
                <th>LastName</th>&nbsp;&nbsp;
                <th>Email</th>&nbsp;&nbsp;
                <th>Mobile</th>
                 </tr>
                 </thead>
                 <tbody>
                  <tr>
              <td>{props.userList.fname}</td>&nbsp;&nbsp;
              <td>{props.userList.lname}</td>&nbsp;&nbsp;
              <td>{props.userList.email}</td>&nbsp;&nbsp;
              <td>{props.userList.mobile}</td>&nbsp;&nbsp;
              <Button bsStyle="primary" onClick={props.onDelete} bsSize="large">Delete</Button>
                 </tr>
                </tbody>
              </table>

               </div>
)
}

export default userList