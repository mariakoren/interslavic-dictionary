// import Protected from "./components/Protected.js";
// import Public from "./components/Public.js";
// import useAuth from "./hooks/useAuth.js";
import Protected from "../../components/Protected.js";
import Public from "../../components/Public";
import useAuth from "../../hooks/useAuth.js";



function Personal() {
  const [isLogin, token] = useAuth();
  return isLogin ? <Protected token={token}/> : <Public />;
}

export default Personal;