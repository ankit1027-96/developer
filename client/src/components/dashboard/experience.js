import React from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteExperience } from "../../actions/profileActions";

const Experience = () => {
  const exp = useSelector(
    (state) => state.rootReducer.profile.profile.experience
  );

  const dispatch = useDispatch();

  const onDeleteClick = (id) => {
    dispatch(deleteExperience(id));
  };

  console.log(exp);
  return (
    <div>
      <h4 className="mb-4" style={{ fontSize: "1.4rem" }}>
        Experience Credentials
      </h4>
      <table className="table">
        <thead>
          <tr>
            <th style={{ fontSize: "1rem" }}>Company</th>
            <th style={{ fontSize: "1rem" }}>Title</th>
            <th style={{ fontSize: "1rem" }}>Years</th>
            <th />
          </tr>
          {exp !== undefined
            ? exp.map((ex, key) => (
                <tr key={ex._id}>
                  <td style={{ fontSize: "1rem" }}>{ex.company}</td>
                  <td style={{ fontSize: "1rem" }}>{ex.title}</td>
                  <td style={{ fontSize: "1rem" }}>
                    <Moment format="YYYY/MM/DD">{ex.from}</Moment> -
                    {ex.to === null ? (
                      " Now"
                    ) : (
                      <Moment format="YYYY/MM/DD">{ex.to}</Moment>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => onDeleteClick(ex._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : ""}
        </thead>
      </table>
    </div>
  );
};

export default Experience;
