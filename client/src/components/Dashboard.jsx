import { useSelector } from "react-redux";

function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Your token: {token}</p>
    </div>
  );
}

export default Dashboard