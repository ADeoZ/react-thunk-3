import Toolbar from "./Toolbar";

export default function NetoSocial(props) {
  return (
    <div className="NetoSocial">
      <Toolbar />
      {props.children}
    </div>
  )
}