import React from "react";
import { handleLoad } from "./SaveTokenView.util";
export default function SaveTokenView() {
   React.useEffect(() => {
      const onload = async () => {
         await handleLoad();
      };
      onload();
   }, []);
   return <div></div>;
}
