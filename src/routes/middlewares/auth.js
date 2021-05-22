import jwt from "../../services/jwt.js";

export const isAuth = async (req, res, next) => {

  const token = req.headers.authorization;
  //reviza que exista una autorizacion
  if (!token) {
    return res
      .status(403)
      .send({ message: "No tiene autorizacion para entrar!" });
  }

  try {
    const payload = await jwt.decodeToken(token);
    /* if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Token expirado!" });
    } */
    req.user = payload.sub;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).send({ message: "Token invalido!" });
  }
};
