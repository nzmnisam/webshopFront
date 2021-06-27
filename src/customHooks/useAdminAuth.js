import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const mapState = ({ user }) => ({
  currentAdmin: user.currentAdmin,
});

const useAdminAuth = (props) => {
  const history = useHistory();
  const { currentAdmin } = useSelector(mapState);

  useEffect(() => {
    if (!currentAdmin) {
      history.push("/");
    }
  }, [currentAdmin]);

  return currentAdmin;
};

export default useAdminAuth;
