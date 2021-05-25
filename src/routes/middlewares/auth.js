import jwt from "../../utils/jwt.js";

export const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(403)
      .send({ message: "No tiene autorizacion para entrar!" });
  }

  try {
    const payload = await jwt.decodeToken(token);
    req.user = payload.sub;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(403).send({ message: "Token invalido!" });
  }
};
