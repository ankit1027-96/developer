import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";


function AddExperience() {
  // Store Access
  const [errors, setErrors] = useState({ errors: {} });
  const [exp, setExp] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
  });

  const authErr = useSelector((state) => state.rootReducer.error);
  let history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (authErr.user !== undefined) {
      setErrors(authErr.user);
    }
  }, [authErr]);

  const onChange = (e) => {
    setExp({ ...exp, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const expData = {
      company: exp.company,
      title: exp.title,
      location: exp.location,
      from: exp.from,
      to: exp.to,
      current: exp.current,
      description: exp.description,
    };

    dispatch(addExperience(expData, history));
  };
  const onCheck = (e) => {
    setExp({
      disabled: !exp.disabled,
      current: !exp.current,
    });
  };

  return (
    <div className="add-experience">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past or current
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={exp.company}
                onChange={onChange}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={exp.title}
                onChange={onChange}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={exp.location}
                onChange={onChange}
                error={errors.location}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={exp.from}
                onChange={onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={exp.to}
                onChange={onChange}
                error={errors.to}
                disabled={exp.disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={exp.current}
                  checked={exp.current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Job Description"
                name="description"
                value={exp.description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the the position"
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}



export default AddExperience;
