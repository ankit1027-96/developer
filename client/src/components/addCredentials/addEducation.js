import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";

const AddEducation = () => {
  // Store Access
  const [errors, setErrors] = useState({ errors: {} });
  const [edu, setEdu] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
  });

  const authErr = useSelector((state) => state.rootReducer.error);
  let history = useHistory();

  const dispatch = useDispatch();

  // Errors Prop
  useEffect(() => {
    if (authErr.user !== undefined) {
      setErrors(authErr.user);
    }
  }, [authErr]);

  const onChange = (e) => {
    setEdu({ ...edu, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const eduData = {
      school: edu.school,
      degree: edu.degree,
      fieldofstudy: edu.fieldofstudy,
      from: edu.from,
      to: edu.to,
      current: edu.current,
      description: edu.description,
    };

    dispatch(addEducation(eduData, history));
  };
  const onCheck = (e) => {
    setEdu({
      disabled: !edu.disabled,
      current: !edu.current,
    });
  };

  return (
    <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school, bootcamp, etc that you have attended
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* School"
                name="school"
                value={edu.school}
                onChange={onChange}
                error={errors.school}
              />
              <TextFieldGroup
                placeholder="* Degree or Certification"
                name="degree"
                value={edu.degree}
                onChange={onChange}
                error={errors.degree}
              />
              <TextFieldGroup
                placeholder="* Field of Study"
                name="fieldofstudy"
                value={edu.fieldofstudy}
                onChange={onChange}
                error={errors.fieldofstudy}
              />
              <h6>From Date</h6>
              <TextFieldGroup
                name="from"
                type="date"
                value={edu.from}
                onChange={onChange}
                error={errors.from}
              />
              <h6>To Date</h6>
              <TextFieldGroup
                name="to"
                type="date"
                value={edu.to}
                onChange={onChange}
                error={errors.to}
                disabled={edu.disabled ? "disabled" : ""}
              />
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={edu.current}
                  checked={edu.current}
                  onChange={onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">
                  Currently Pursueing
                </label>
              </div>
              <TextAreaFieldGroup
                placeholder="Program Description"
                name="description"
                value={edu.description}
                onChange={onChange}
                error={errors.description}
                info="Tell us about the program that you were in"
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
};



export default AddEducation;
