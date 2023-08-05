import Cookies from "js-cookie";
import { handleApi } from "../../utils/util";

export const handleLoad = async () => {
   let resonse = await handleApi("identity", {});
   if (resonse.active) {
      return resonse;
   } else {
      Cookies.remove("instance_url");
      Cookies.remove("access_token");
      window.open("/", "_self");
   }
};
export const handleLogout = async () => {
   await handleApi("logout", {});
   Cookies.remove("instance_url");
   Cookies.remove("access_token");
   window.open("/", "_self");
};
