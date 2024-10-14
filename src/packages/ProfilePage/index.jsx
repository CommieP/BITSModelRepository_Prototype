import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Your Firebase config
import { clearUser } from "../store/reducers/userReducer"; // Action to clear user from store

const ProfilePage = ({ email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Firebase sign out
      await signOut(auth);
      console.log("User logged out successfully");

      // Clear user from Redux store
      dispatch(clearUser());

      // Navigate to login/signup page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="page">
      <h2>Welcome, {email}</h2>

      <button className="profileButton" onClick={handleLogout}>
        Logout
      </button>

      <button className="profileButton">
        Upload Model
      </button>
    </div>
  );
};

export default ProfilePage;
