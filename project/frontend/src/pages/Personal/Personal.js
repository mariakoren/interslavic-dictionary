import Protected from "../../components/Protected.js";
import Public from "../../components/Public";
import useAuth from "../../hooks/useAuth.js";
import Admin from "../../components/Admin.js";

function Personal() {
  const [isLogin, token, isAdmin] = useAuth();
  return isAdmin ? <Admin  token={token}/> : (isLogin ? <Protected token={token}/> : <Public />);
}

export default Personal;