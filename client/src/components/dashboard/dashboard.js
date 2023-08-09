import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common /Spinner";
import { Link } from "react-router-dom";

function Dashboard() {
  const profile = useSelector((state) => state.rootReducer.profile);
  const auth = useSelector((state) => state.rootReducer.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  let dashboardContent;

  if (profile.profile === null || profile.loading) {
    dashboardContent = <Spinner />;
  } else {
    if (Object.keys(profile.profile).length > 0) {
      dashboardContent = <h4>TODO: Display Profile</h4>;
    } else {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {auth.user.name}</p>
          <p className="lead text-muted">
            You have not yet created a profile, please add some info
          </p>

          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard{dashboardContent}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default Dashboard;
