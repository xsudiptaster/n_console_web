import { Button, FileButton, Flex } from "@mantine/core";
import React from "react";
import ReactFlow, { Background, Controls, MiniMap, Panel, applyEdgeChanges, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";
import { useRecoilState } from "recoil";
import { download, readFileAsText } from "../../utils/util";
import { draggedObjectAtom, edgesAtom, nodesAtom, selectedEdgeAtom } from "./../../atoms/atom";
import { createEdges, handleAddNode, handleLoad, onImageDownload } from "./DiagramView.util";
import EdgeConfig from "./EdgeConfig/EdgeConfig";
import NodeView from "./NodeView/NodeView";
import ObjectConfigView from "./ObjectConfigView/ObjectConfigView";
import ObjectsView from "./ObjectsView/ObjectsView";

const nodeTypes = { object: NodeView };
export default function DiagramView() {
   const reactFlowWrapper = React.useRef(null);
   const [nodes, setNodes] = useRecoilState(nodesAtom);
   const [edges, setEdges] = useRecoilState(edgesAtom);
   const [dragObject, setDragObject] = useRecoilState(draggedObjectAtom);
   const [, setSelectedEdge] = useRecoilState(selectedEdgeAtom);
   const [objectList, setObjectList] = React.useState([]);
   const [reactFlowInstance, setReactFlowInstance] = React.useState(null);

   React.useEffect(() => {
      const onload = async () => {
         let response = await handleLoad();
         setObjectList(response);
      };
      onload();
   }, []);
   const onNodesChange = React.useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
   const onEdgesChange = React.useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
   const onDragOver = React.useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
   }, []);
   const onDrop = async (event) => {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
         x: event.clientX - reactFlowBounds.left,
         y: event.clientY - reactFlowBounds.top,
      });
      if (dragObject.name) {
         let response = await handleAddNode(nodes, dragObject, position);
         setNodes(response);
         setDragObject({});
      }
   };
   const onDrag = () => {
      let response = createEdges(nodes, edges);
      setEdges(response);
   };
   const onDownload = () => {
      download("ERD.json", JSON.stringify({ nodes, edges }));
   };
   const onImage = () => {
      onImageDownload(nodes);
   };
   const onFileUpload = async (payload) => {
      console.log("🚀 ---------------------------------------------------🚀");
      console.log("🚀 ~ file: DiagramView.jsx:66 ~ onFileUpload ~ e:", payload);
      console.log("🚀 ---------------------------------------------------🚀");
      let text = await readFileAsText(payload);
      let jsonData = JSON.parse(text);
      console.log("🚀 -----------------------------------------------------------------🚀");
      console.log("🚀 ~ file: DiagramView.jsx:63 ~ onFileUpload ~ jsonData:", jsonData);
      console.log("🚀 -----------------------------------------------------------------🚀");
      setNodes(jsonData?.nodes);
      setEdges(jsonData?.edges);
   };
   return (
      <>
         <div
            style={{ height: "95vh" }}
            ref={reactFlowWrapper}
            onClick={() => {
               setSelectedEdge({});
            }}
         >
            <ReactFlow
               nodes={nodes}
               edges={edges}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               onInit={setReactFlowInstance}
               onNodeDragStop={onDrag}
               onEdgeClick={(e, edge) => {
                  setSelectedEdge(edge);
                  e.stopPropagation();
               }}
               onDrop={onDrop}
               onDragOver={onDragOver}
               nodeTypes={nodeTypes}
               fitView
               attributionPosition="top-right"
            >
               <Background />
               <MiniMap />
               <Controls />
               <Panel position="top-right">
                  <ObjectsView objectList={objectList} />
               </Panel>
               <Panel position="top=left">
                  <Flex mih={50} bg="rgba(0, 0, 0, .3)" gap="xs" justify="center" align="center" direction="row" wrap="wrap">
                     <FileButton
                        onChange={(payload) => {
                           onFileUpload(payload);
                        }}
                        accept="json/txt"
                     >
                        {(props) => (
                           <Button size="xs" {...props}>
                              Upload ERD
                           </Button>
                        )}
                     </FileButton>
                     <Button size="xs" onClick={onDownload}>
                        Download
                     </Button>
                     <Button size="xs" onClick={onImage}>
                        Download Image
                     </Button>
                  </Flex>
                  <EdgeConfig />
               </Panel>
            </ReactFlow>
         </div>
         <ObjectConfigView />
      </>
   );
}
