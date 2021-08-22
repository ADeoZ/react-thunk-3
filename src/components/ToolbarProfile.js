import { useSelector, useDispatch } from "react-redux";
import { resetAuth } from "../actions/actionCreators";

export default function ToolbarProfile() {  
  let { profile } = useSelector((state) => state.loginForm);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetAuth());
  }

  return (
    <div className="ToolbarProfile">
      <div className="ToolbarProfile__name">
        Hello, {profile.name}
      </div>
      <div className="ToolbarProfile__avatar">
        <img src={profile.avatar} alt={profile.name} />
      </div>
      <div className="ToolbarProfile__logout">
        <button className="ToolbarProfile__button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}