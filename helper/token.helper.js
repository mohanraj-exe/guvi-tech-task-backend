const JWT = require('jsonwebtoken');
const TOKEN_LIFE = '1d';
const SECRET_KEY = "guvi";

const GenerateToken = (data) => {
  try {
    const token = JWT.sign({ id: data }, SECRET_KEY, { expiresIn: TOKEN_LIFE });
    return token 
  } catch (error) {
    return error
  }
};

const VerifyAccessToken = (data) => {
  try {
    var token = JWT.verify(data.trim(), SECRET_KEY);
    return token 
  } catch (error) {
    return error
  }
}

module.exports = { GenerateToken, VerifyAccessToken };