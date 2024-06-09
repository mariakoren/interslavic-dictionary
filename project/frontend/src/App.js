import Protected from "./components/Protected.js";
import Public from "./components/Public.js";

import useAuth from "./hooks/useAuth.js";

function App() {
  const [isLogin, token] = useAuth();
  return isLogin ? <Protected token={token}/> : <Public />;
}

export default App;