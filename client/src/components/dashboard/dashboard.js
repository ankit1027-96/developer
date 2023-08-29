import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from "./experience";

function Dashboard() {
  // Store Access
  const profile = useSelector((state) => state.rootReducer.profile);
  const auth = useSelector((state) => state.rootReducer.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  const onDeleteClick = () => {
    dispatch(deleteAccount());
  };

  let dashboardContent;

  if (profile.profile === null || profile.loading) {
    dashboardContent = <Spinner />;
  } else {
    if (Object.keys(profile.profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome{" "}
            <Link to={`/profile/${profile.handle}`}>{auth.user.name}</Link>
          </p>

          <ProfileActions />
          <Experience />
          <div style={{ margin: "60px" }} />
          <button onClick={onDeleteClick} className="btn btn-danger">
            Delete My Account
          </button>
        </div>
      );
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

export default Dashboard;
