import axios from "axios";
import Cookies from "js-cookie";
export const client_Id = "3MVG98Gq2O8Po4Zl.CxYgXkOHCzVzhX41TyKEerIzAFH57kxDPXN2pb2FtSKVrsXDs._TdIrtuUuMQwf40IYW";
export const client_secret = "F501336AAC5EEAAFE6F411C2025350C2BD62C7AEE500376564FB248D8B14DFE2";
export const handleApi = async (api, data) => {
   let instanceUrl = Cookies.get("instance_url");
   let accessToken = Cookies.get("access_token");
   let body = {
      ...data,
      instanceUrl,
      accessToken,
   };
   let response = await axios.post("/api/" + api, body);
   const expirationTime = 15;
   const now = new Date();
   now.setTime(now.getTime() + expirationTime * 60 * 1000);
   Cookies.set("instance_url", instanceUrl, { expires: now, sameSite: "strict" });
   Cookies.set("access_token", accessToken, { expires: now, sameSite: "strict" });
   return response.data;
};
export const download = (filename, text) => {
   const element = document.createElement("a");
   element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
   element.setAttribute("download", filename);
   element.style.display = "none";
   document.body.appendChild(element);
   element.click();
   document.body.removeChild(element);
};
export const readFileAsText = async (file) => {
   const result = await new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsText(file);
   });
   return result;
};
