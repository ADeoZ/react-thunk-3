import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import ToolbarForm from "./ToolbarForm";
import ToolbarProfile from './ToolbarProfile';

export default function Toolbar() {  
  let { token, profile } = useSelector((state) => state.loginForm);
  let homeLink = '/';
  if (token) {
    homeLink = '/news';
  }

  return (
    <div className="Toolbar">
      <Link to={homeLink} className="Toolbar__logo">Neto Social</Link>
      {!profile && <ToolbarForm />}
      {profile && <ToolbarProfile />}
    </div>
  );
}