import jsonwebtoken from "jsonwebtoken";
const privateKey = process.env.TOKEN_SECRET;

const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      payload,
      privateKey,
      {
        expiresIn: "1d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  })};

export { createAccessToken };
