import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import TextFieldGroup from "../common/textFieldGroup";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authActions";

const Login = (props) => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ errors: {} });

  // access store using hook useSelector
  const auth = useSelector((state) => state.rootReducer.auth);
  const authErr = useSelector((state) => state.rootReducer.error);

  // Dispatch Action
  const dispatch = useDispatch();
  // Router History
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: login.email,
      password: login.password,
    };

    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [onSubmit]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }

    if (authErr.user !== undefined) {
      setErrors(authErr.user);
    }
  }, [authErr]);

  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">
              Sign in to your DevConnector account
            </p>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={login.email}
                onChange={onChange}
                error={errors.email}
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={login.password}
                onChange={onChange}
                error={errors.password}
              />

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Login;

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { loginUser } from "../../actions/authActions";
// import { withRouter } from "react-router-dom";
// import TextFieldGroup from "../common/textFieldGroup";

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       errors: {},
//     };
//   }

//   componentDidMount() {
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push("/dashboard");
//     }
//   }

//   UNSAFE_componentWillReceiveProps(nextProps) {
//     if (nextProps.auth.isAuthenticated) {
//       this.props.history.push("/dashboard");
//     }

//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors.user });
//     }
//   }

//   onChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   onSubmit = (e) => {
//     e.preventDefault();
//     const userData = {
//       email: this.state.email,
//       password: this.state.password,
//     };
//     this.props.loginUser(userData);
//   };

//   render() {
//     console.log(this.state);
//     const { errors } = this.state;
//     console.log(errors);
//     return (
//       <div className="login">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-8 m-auto">
//               <h1 className="display-4 text-center">Log In</h1>
//               <p className="lead text-center">
//                 Sign in to your DevConnector account
//               </p>
//               <form onSubmit={this.onSubmit}>
//                 <TextFieldGroup
//                   placeholder="Email Address"
//                   name="email"
//                   type="email"
//                   value={this.state.email}
//                   onChange={this.onChange}
//                   error={errors.email}
//                 />

//                 <TextFieldGroup
//                   placeholder="Password"
//                   name="password"
//                   type="password"
//                   value={this.state.password}
//                   onChange={this.onChange}
//                   error={errors.password}
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

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.rootReducer.auth,
//   errors: state.rootReducer.error,
// });

// export default connect(mapStateToProps, { loginUser })(withRouter(Login));
