const CryptoJS = require("crypto-js");

// // Encrypt
// function encrypt(text) {
//   return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
// }

export function decrypt(text) {
  return CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8);
}

// API Keys for Open Weather API (Free for all) Encrypted
export const secrets = {
  OPENWEATHER: "",
};