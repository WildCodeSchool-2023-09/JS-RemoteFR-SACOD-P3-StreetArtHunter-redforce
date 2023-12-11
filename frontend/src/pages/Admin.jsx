import "../css/admin.css";

export default function Admin() {
  return (
    <div className="container-admin">
      <button className="validation" type="button">
        Photos awaiting validation
      </button>
      <button type="button">User profile list</button>
      <button type="button">list of street art works</button>
      <button type="button" className="signout-button">
        Sign out
      </button>
    </div>
  );
}
