import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/textFieldGroup";

const Register = (props) => {
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({ errors: {} });

  const authErr = useSelector((state) => state.rootReducer.error);

  useEffect(() => {
    if (authErr.user !== undefined) {
      setErrors(authErr.user);
    }
  }, [authErr]);

  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: signUp.name,
      email: signUp.email,
      password: signUp.password,
      password2: signUp.password2,
    };
    // redux action
    dispatch(registerUser(newUser, history));
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={signUp.name}
                onChange={onChange}
                error={errors.name}
              />

              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={signUp.email}
                onChange={onChange}
                error={errors.email}
                info=" This site uses Gravatar so if you want a profile image, use
            a Gravatar email"
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={signUp.password}
                onChange={onChange}
                error={errors.password}
              />
              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={signUp.password2}
                onChange={onChange}
                error={errors.password2}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default Register;

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { registerUser } from "../../actions/authActions";
// import PropTypes from "prop-types";
// import { withRouter } from "react-router-dom";
// import TextFieldGroup from "../common/textFieldGroup";
// class Register extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       password2: "",
//       errors: {},
//     };
//   }
//   UNSAFE_componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors.user });
//     }
//   }

//   onChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     const newUser = {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//       password2: this.state.password2,
//     };
//     // redux action
//     this.props.registerUser(newUser, this.props.history);
//   };

//   render() {
//     const { errors } = this.state;

//     return (
//       <div className="register">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <h1 className="display-4 text-center">Sign Up</h1>
//               <p className="lead text-center">
//                 Create your DevConnector account
//               </p>
//               <form noValidate onSubmit={this.onSubmit}>
//                 <TextFieldGroup
//                   placeholder="Name"
//                   name="name"
//                   value={this.state.name}
//                   onChange={this.onChange}
//                   error={errors.name}
//                 />

//                 <TextFieldGroup
//                   placeholder="Email Address"
//                   name="email"
//                   type="email"
//                   value={this.state.email}
//                   onChange={this.onChange}
//                   error={errors.email}
//                   info=" This site uses Gravatar so if you want a profile image, use
//                   a Gravatar email"
//                 />

//                 <TextFieldGroup
//                   placeholder="Password"
//                   name="password"
//                   type="password"
//                   value={this.state.password}
//                   onChange={this.onChange}
//                   error={errors.password}
//                 />
//                 <TextFieldGroup
//                   placeholder="Confirm Password"
//                   name="password2"
//                   type="password"
//                   value={this.state.password2}
//                   onChange={this.onChange}
//                   error={errors.password2}
//                 />
//                 <input type="submit" className="btn btn-info btn-block mt-4" />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Register.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };

// // accessing redux store state

// const mapStateToProps = (state) => ({
//   auth: state.rootReducer.auth,
//   errors: state.rootReducer.error,
// });
// export default connect(mapStateToProps, { registerUser })(withRouter(Register));
// //  action {registerUser}
