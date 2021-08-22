import { useSelector, useDispatch } from "react-redux";
import {
  changeAuthFields,
  getLogin,
  getProfile,
} from "../actions/actionCreators";

export default function ToolbarForm() {
  let { fields, error } = useSelector((state) => state.loginForm);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(getLogin());
    await dispatch(getProfile());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(changeAuthFields(name, value));
  };

  return (
    <form className="ToolbarForm" onSubmit={handleSubmit}>
      {error || <div>{error}</div>}
      <input
        className="ToolbarForm__login"
        name="login"
        value={fields.login}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        className="ToolbarForm__password"
        name="password"
        value={fields.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button className="ToolbarForm__button">Login</button>
    </form>
  );
}
