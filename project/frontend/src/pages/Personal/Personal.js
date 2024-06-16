import Protected from "../../components/Protected.js";
import Public from "../../components/Public";
import useAuth from "../../hooks/useAuth.js";
import Admin from "../../components/Admin.js";

function Personal() {
  const [isLogin, token, isAdmin, client] = useAuth();
  return isAdmin ? <Admin  token={token} client={client}/> : (isLogin ? <Protected token={token} client={client}/> : <Public />);
}

export default Personal;