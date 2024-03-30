import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [changeDetails, setChangeDetails] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
      setFormData({
        name: auth.currentUser.displayName || "",
        email: auth.currentUser.email || "",
      });
    } else {
      // Handle case when user is not logged in
      navigate("/sign-in");
    }
  }, [auth.currentUser, navigate]);

  const onLogout = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== formData.name) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: formData.name,
        });
      }
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  };

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const { name, email } = formData;

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        {user && (
          <>
            <div className="profileDetailsHeader">
              <p className="profileDetailsText">Personal Details</p>
              <p
                className="changePersonalDetails"
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? "Done" : "Change"}
              </p>
            </div>

            <div className="profileCard">
              <form>
                <input
                  type="text"
                  id="name"
                  className={!changeDetails ? "profileName" : "profileNameActive"}
                  disabled={!changeDetails}
                  value={name}
                  onChange={onChange}
                />
                <input
                  type="text"
                  id="email"
                  className={!changeDetails ? "profileEmail" : "profileEmailActive"}
                  disabled={!changeDetails}
                  value={email}
                  onChange={onChange}
                />
              </form>
            </div>
          </>
        )}

        {!user && (
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Please sign in to view your profile</p>
            <Link to="/sign-in" className="signInLink">Sign In</Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
