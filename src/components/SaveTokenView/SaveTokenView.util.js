import Cookies from "js-cookie";
const parseHash = (fragment) => {
   const map = {};
   let strhash = decodeURIComponent(fragment.substring(1));
   let hashes = strhash.split("&");
   for (let i = 0; i < hashes.length; i++) {
      let keyVal = hashes[i].split("=");
      map[keyVal[0]] = keyVal[1];
   }
   return map;
};
export const handleLoad = async (instanceUrl) => {
   const oUrl = new URL(window.location.href);
   const sessionInfo = parseHash(oUrl.hash);
   const expirationTime = 15; // 15 minutes
   const now = new Date();
   now.setTime(now.getTime() + expirationTime * 60 * 1000);
   if (sessionInfo.access_token) {
      for (let key in sessionInfo) {
         Cookies.set(key, sessionInfo[key], { expires: now, sameSite: "strict" });
      }
      window.open("/home", "_self");
   } else {
      window.open("/", "_self");
   }
};
