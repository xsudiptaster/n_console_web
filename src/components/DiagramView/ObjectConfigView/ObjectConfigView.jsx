import { Accordion, Checkbox, Modal, SimpleGrid, Tooltip } from "@mantine/core";
import React from "react";
import { useRecoilState } from "recoil";
import { edgesAtom, nodesAtom, selectedNodeAtom } from "../../../atoms/atom";
import { createEdges, selectField } from "../DiagramView.util";
export default function ObjectConfigView() {
   const [selectedNode, setSelectedNode] = useRecoilState(selectedNodeAtom);
   const [nodes, setNodes] = useRecoilState(nodesAtom);
   const [edges, setEdges] = useRecoilState(edgesAtom);
   const [mapFields, setMapFields] = React.useState({});
   React.useEffect(() => {
      const onload = () => {
         if (selectedNode.fields) {
            let obj = {};
            selectedNode?.fields?.forEach((field) => {
               if (obj[field.type]) {
                  obj[field.type].push(field);
               } else {
                  obj[field.type] = [];
                  obj[field.type].push(field);
               }
            });
            setMapFields(obj);
         }
      };
      onload();
   }, [selectedNode.fields]);
   const onChange = (e, field) => {
      let response = selectField(nodes, selectedNode, field, e.target.checked);
      setNodes(response);
      let tempEdges = createEdges(response, edges);
      setEdges(tempEdges);
   };
   return (
      <div>
         <Modal
            opened={selectedNode.name ? true : false}
            size="xl"
            onClose={() => {
               setSelectedNode({});
            }}
            title="Object Config"
         >
            <Accordion variant="contained" chevronPosition="left" defaultValue="reference">
               {Object.keys(mapFields).length > 0
                  ? Object.keys(mapFields).map((type) => {
                       return (
                          <Accordion.Item value={type} key={type}>
                             <Accordion.Control>{type.toUpperCase()}</Accordion.Control>
                             <Accordion.Panel>
                                <SimpleGrid cols={4}>
                                   {mapFields[type].map((field) => {
                                      return (
                                         <Tooltip label={field.name} key={field.name}>
                                            <div>
                                               <Checkbox
                                                  label={field.label}
                                                  radius="xl"
                                                  size="xs"
                                                  defaultChecked={
                                                     selectedNode && selectedNode?.selectedFields
                                                        ? selectedNode?.selectedFields.some((ofield) => {
                                                             return field.name === ofield.name;
                                                          })
                                                        : false
                                                  }
                                                  onChange={(e) => {
                                                     onChange(e, field);
                                                  }}
                                               />
                                            </div>
                                         </Tooltip>
                                      );
                                   })}
                                </SimpleGrid>
                             </Accordion.Panel>
                          </Accordion.Item>
                       );
                    })
                  : ""}
            </Accordion>
         </Modal>
      </div>
   );
}
