import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  currentAdmin: user.currentAdmin,
});

const useAuth = (props) => {
  const history = useHistory();
  const { currentUser, currentAdmin } = useSelector(mapState);
  useEffect(() => {
    if (!currentUser && !currentAdmin) {
      history.push("/login");
    }
  }, [currentUser, currentAdmin]);
  return { currentUser, currentAdmin };
};

export default useAuth;
