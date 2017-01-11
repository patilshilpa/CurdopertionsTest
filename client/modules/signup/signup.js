import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import  { addSignUpRequest,fetchUserList, deleteListRequest}  from './signupActions';
import { Link} from 'react-router';
import { FormGroup, FormControl, Button, Input} from 'react-bootstrap';
 import { ReactToastr, ToastContainer, ToastMessage} from 'react-toastr';
 import { browserHistory } from 'react-router';
 import SignupList from './signupList';


class Signup extends React.Component {

	constructor(props) {
    super(props);
  	
  	this.state={
  		fname:'',
  		lname:'',
  		email:'',
  		password:'',
  		mobile:''
  	};
    this.validateEmail = false;
    this.validateMobile = false;
    this.submitDetails=this.submitDetails.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);    
    this.handleChangeemail = this.handleChangeemail.bind(this);
    this.handleChangemobile= this.handleChangemobile.bind(this);
  };

signUp(){
  browserHistory.push('/Login');
}

handleDeleteList = post => {
  console.log("im here");
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deleteListRequest(post));
    }
  };

componentWillMount(props) {
    this.props.dispatch(fetchUserList());
  }
componentWillReceiveProps(nextProps) {
    if(nextProps.message.message == 'Email Id already exists') {
      setInterval(function(){}, 2000);
      this.refs.container.error(`${nextProps.message.message}`);
    } else if(nextProps.message.message == 'User registered successfully'){
      this.refs.container.success(`${nextProps.message.message}`);
      setInterval(function(){browserHistory.push('/Login')}, 2000);
      
    }
  }
    submitDetails(event){
    	event.preventDefault();
       if(ReactDOM.findDOMNode(this.refs.fname).value == ''){
        alert("Plese enter all the fields");
      }else if(ReactDOM.findDOMNode(this.refs.lname).value == ''){
        alert("Please enter all the fields");
      }else if(!this.validateEmail){
      alert("invalid email id");
     }else if(ReactDOM.findDOMNode(this.refs.password).value == ''){
        alert("Enter a password");
      }else if(!this.validateMobile){
      alert("invalid MobileNo");
     }else{
       let fname = ReactDOM.findDOMNode(this.refs.fname).value;
       let lname = ReactDOM.findDOMNode(this.refs.lname).value;
       let email = ReactDOM.findDOMNode(this.refs.email).value;
       let password = ReactDOM.findDOMNode(this.refs.password).value;
       let mobile = ReactDOM.findDOMNode(this.refs.mobile).value;
       console.log(fname,lname,email,password,mobile);

      if(fname && lname && email && password && mobile){
        this.props.dispatch(addSignUpRequest({fname,lname,email,password,mobile}));
      }
    }

   }
   validateemail(email){
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(email);
  }
  handleChangeemail(event) {
     this.validateEmail = this.validateemail(event.target.value)
  } 
   validatemobile(mobile){
    let pattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return pattern.test(mobile);
  }
  handleChangemobile(event) {
     this.validateMobile = this.validatemobile(event.target.value)
  } 
	render() {
		return (
      <div> 
      <h3>Product form </h3><br/> 
  			<form>
        <div className="row">
        <div className="col-xs-6">
  		<FormGroup>
            <FormControl type="text" placeholder="FirstName"  ref="fname" />
        </FormGroup>
          </div>
      </div>
        <div className="row">
        <div className="col-xs-6">
        <FormGroup>
  			<FormControl type="text" placeholder="LastName" ref="lname"/> 
          </FormGroup>
          </div>
      </div>
            <div className="row">
        <div className="col-xs-6">
        <FormGroup>
  			<FormControl type="email" placeholder="Email" onChange= {this.handleChangeemail} ref="email"/> 
          </FormGroup>
          </div>
      </div>
            <div className="row">
        <div className="col-xs-6">
          <FormGroup>
  		<FormControl type="password" placeholder="Password" ref="password"/>
           </FormGroup>
           </div>
      </div>
             <div className="row">
        <div className="col-xs-6">
          <FormGroup>
  			<FormControl type="text" placeholder="MobileNo." onChange= {this.handleChangemobile} ref="mobile"/>
           </FormGroup>
           </div>
      </div>
        <ToastContainer ref="container"
                          toastMessageClass={ToastMessage.jQuery}
                          className="toast-top-right" />
  			  <Button type="submit" bsStyle="success"onClick={this.submitDetails}>Signup</Button>&nbsp;
  		
        </form>
      
          <SignupList handleDeleteList={this.handleDeleteList} userList={this.props.userList} />
        </div>

    )
	}
}

Signup.need = [() => { return fetchUserList(); }];

function mapStateToProps(state) {
  console.log('datails',state.signup.data); 
  return {
    message: state.signup.data,
    userList: state.signup.data
  }
}
Signup.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.shape({
    fname: PropTypes.string.isRequired,
    lname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  })).isRequired,
   handleDeleteList: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Signup);