import React from "react";
import { useRecoilState } from "recoil";
import { selectedAppAtom } from "../../atoms/atom";
import RenderIf from "../../utils/RenderIf";
import DiagramView from "../DiagramView/DiagramView";
import { AppHeaderView } from "./AppHeaderView";
import { handleLoad } from "./MainLayoutView.util";
export default function MainLayoutView() {
   const [selectedApp] = useRecoilState(selectedAppAtom);
   const [identity, setIdentity] = React.useState({});
   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setIdentity(response);
      };
      onload();
   }, []);
   const items = [
      {
         link: "diagram",
         label: "Diagram",
      },
      {
         link: "reportType",
         label: "Report Type",
      },
      {
         link: "data",
         label: "Data",
         children: [
            {
               link: "apex",
               label: "Apex Code",
            },
            {
               link: "query",
               label: "Query",
            },
         ],
      },
   ];

   return (
      <div>
         <AppHeaderView links={items} identity={identity} />
         <RenderIf renderIf={"diagram" === selectedApp}>
            <DiagramView />
         </RenderIf>
      </div>
   );
}
