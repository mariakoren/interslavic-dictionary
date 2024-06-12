// import Protected from "../../components/Protected.js";
import Public from "../../components/Public.js";
import useAuth from "../../hooks/useAuth.js";
import Word from "../../components/Word.js";
import { useParams } from 'react-router-dom';

function Writeword() {
  const [isLogin, token] = useAuth();
  const { idWord } = useParams();
  return isLogin ? <Word token={token} idWord={idWord}/> : <Public />;
}

export default Writeword;