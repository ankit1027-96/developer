import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/textFieldGroup";
import SelectListGroup from "../common/selectListGroup";
import TextAreaFieldGroup from "../common/textAreaFieldGroup";
import InputGroup from "../common/inputGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

const EditProfile = (props) => {
  // Store Access
  const profile = useSelector((state) => state.rootReducer.profile.profile);
  //   const authErr = useSelector((state) => state.rootReducer.error);
  const rootRed = useSelector((state) => state.rootReducer);

  const [bio, setBio] = useState({
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  const [errors, setErrors] = useState({ errors: {} });

  // Dispatch Action
  const dispatch = useDispatch();
  // History Object
  let history = useHistory();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  useEffect(() => {
    if (rootRed.error.user !== undefined) {
      setErrors(rootRed.error.user);
    }

    if (profile) {
      let uprofile = { ...profile };
      console.log(uprofile);
      // console.log(profile);

      // skills array to str
      let skillsCSV;

      if (uprofile.skills !== undefined) {
        skillsCSV = uprofile.skills.join(",");
      }

      //
        uprofile.company = uprofile.company ? uprofile.company : "";
      //
      uprofile.website = uprofile.website ? uprofile.website : "";
      uprofile.location = uprofile.location ? uprofile.location : "";
      uprofile.githubusername =
        uprofile.githubusername ? uprofile.githubusername : ""
      ;
      uprofile.bio = uprofile.bio ? uprofile.bio : "";
      uprofile.social = uprofile.social ? uprofile.social : {};

      if (uprofile.social !== false) {
        uprofile.twitter = 
          uprofile.social.twitter ? uprofile.social.twitter : ""
        ;
        uprofile.facebook = 
          uprofile.social.facebook ? uprofile.social.facebook : ""
        ;
        uprofile.linkedin = 
          uprofile.social.linkedin ? uprofile.social.linkedin : ""
        ;
        uprofile.youtube = 
          uprofile.social.youtube ? uprofile.social.youtube : ""
        ;
        uprofile.instagram = 
          uprofile.social.instagram ? uprofile.social.instagram : ""
        ;
      }

      setBio({
        handle: uprofile.handle,
        company: uprofile.company,
        website: uprofile.website,
        location: uprofile.location,
        status: uprofile.status,
        skills: skillsCSV,
        githubusername: uprofile.githubusername,
        bio: uprofile.bio,
        twitter: uprofile.twitter,
        facebook: uprofile.facebook,
        instagram: uprofile.instagram,
        linkedin: uprofile.linkedin,
      });
    }
  }, [rootRed, profile]);
  useEffect(() => {});
  // console.log(bio);
  const onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: bio.handle,
      company: bio.company,
      website: bio.website,
      location: bio.location,
      status: bio.status,
      skills: bio.skills,
      githubusername: bio.githubusername,
      bio: bio.bio,
      twitter: bio.twitter,
      facebook: bio.facebook,
      linkedin: bio.linkedin,
      youtube: bio.youtube,
      instagram: bio.instagram,
    };

    dispatch(createProfile(profileData, history));
  };

  const onChange = (e) => {
    setBio({ ...bio, [e.target.name]: e.target.value });
  };

  let socialInputs;

  if (bio.displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={bio.twitter}
          onChange={onChange}
          error={errors.twitter}
        />

        <InputGroup
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook"
          value={bio.facebook}
          onChange={onChange}
          error={errors.facebook}
        />

        <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={bio.linkedin}
          onChange={onChange}
          error={errors.linkedin}
        />

        <InputGroup
          placeholder="YouTube Channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={bio.youtube}
          onChange={onChange}
          error={errors.youtube}
        />

        <InputGroup
          placeholder="Instagram Page URL"
          name="instagram"
          icon="fab fa-instagram"
          value={bio.instagram}
          onChange={onChange}
          error={errors.instagram}
        />
      </div>
    );
  }

  // Select options for status
  const options = [
    { label: "* Select Professional Status", value: 0 },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];
  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Your Profile</h1>

            <form onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={bio.handle}
                onChange={onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectListGroup
                placeholder="Status"
                name="status"
                value={bio.status}
                onChange={onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={bio.company}
                onChange={onChange}
                error={errors.company}
                info="Could be your own company or one you work for"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={bio.website}
                onChange={onChange}
                error={errors.website}
                info="Could be your own website or a company one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={bio.location}
                onChange={onChange}
                error={errors.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={bio.skills}
                onChange={onChange}
                error={errors.skills}
                info="Please use comma separated values (eg.
                HTML,CSS,JavaScript,PHP"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={bio.githubusername}
                onChange={onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={bio.bio}
                onChange={onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />

              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setBio((prevState) => ({
                      displaySocialInputs: !prevState.displaySocialInputs,
                    }));
                  }}
                  className="btn btn-light"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
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

export default EditProfile;
