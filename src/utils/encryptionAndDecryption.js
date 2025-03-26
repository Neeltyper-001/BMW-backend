import CryptoJS from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

// Encrypt data
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.SECRET_KEY).toString();
};

// Decrypt data
export const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
