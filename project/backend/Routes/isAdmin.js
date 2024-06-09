import jwtmod from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  // console.log(token);

  const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;

  const decodedToken = jwtmod.verify(token, public_key, {
    algorithms: ["RS256"],
  });
  // console.log(decodedToken);

  const { realm_access} = decodedToken;
  console.log(realm_access.roles.includes("administrator"))
};