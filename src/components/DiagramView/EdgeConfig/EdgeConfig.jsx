import { Card, Checkbox, ColorInput, Input, NativeSelect, NumberInput, Paper, SimpleGrid } from "@mantine/core";
import { useRecoilState } from "recoil";
import { edgesAtom, selectedEdgeAtom } from "../../../atoms/atom";
import RenderIf from "../../../utils/RenderIf";
export default function EdgeConfig() {
   const linkTypes = [
      { label: "Default", value: "default" },
      { label: "Straight", value: "straight" },
      { label: "Step", value: "step" },
      { label: "Smooth Step", value: "smoothstep" },
      { label: "Simple Bezier", value: "simplebezier" },
   ];
   const [selectedEdge] = useRecoilState(selectedEdgeAtom);
   const [edges, setEdges] = useRecoilState(edgesAtom);
   const onLabelChange = (value) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge) => {
         if (edge.id === selectedEdge.id) {
            edge.label = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onLinkChange = (value) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge) => {
         if (edge.id === selectedEdge.id) {
            edge.type = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onAnimatedChange = (value) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge) => {
         if (edge.id === selectedEdge.id) {
            edge.animated = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onStrokeWidthChange = (value) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge) => {
         if (edge.id === selectedEdge.id) {
            edge.style.strokeWidth = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onDashesChange = (value) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge) => {
         if (edge.id === selectedEdge.id) {
            edge.style.strokeDasharray = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };
   const onColorChange = (value) => {
      let tempEdges = JSON.parse(JSON.stringify(edges));
      tempEdges = tempEdges.map((edge) => {
         if (edge.id === selectedEdge.id) {
            edge.style.stroke = value;
         }
         return edge;
      });
      setEdges(tempEdges);
   };

   return (
      <RenderIf renderIf={selectedEdge.id}>
         <Card
            shadow="sm"
            padding="lg"
            radius="xs"
            withBorder
            onClick={(e) => {
               e.stopPropagation();
            }}
         >
            <Card.Section>Edge Config</Card.Section>
            <Card.Section style={{ paddingTop: "10px" }}>
               <Paper withBorder>
                  <SimpleGrid cols={2}>
                     <div>
                        <Input.Wrapper label="Edge label">
                           <Input
                              defaultValue={selectedEdge.label}
                              size="xs"
                              onChange={(e) => {
                                 onLabelChange(e.target.value);
                              }}
                           />
                        </Input.Wrapper>
                     </div>
                     <div>
                        <NativeSelect
                           data={linkTypes}
                           defaultValue={selectedEdge.type}
                           label="Edge Type"
                           size="xs"
                           onChange={(e) => {
                              onLinkChange(e.target.value);
                           }}
                        />
                     </div>
                     <div>
                        <NumberInput
                           placeholder="Size"
                           defaultValue={selectedEdge.style?.strokeWidth}
                           label="Edge Size"
                           size="xs"
                           min={1}
                           onChange={(value) => {
                              onStrokeWidthChange(value);
                           }}
                        />
                     </div>
                     <div>
                        <NumberInput
                           placeholder="stroke"
                           label="Edge Stroke"
                           defaultValue={selectedEdge.style?.strokeDasharray}
                           size="xs"
                           min={0}
                           onChange={(value) => {
                              onDashesChange(value);
                           }}
                        />
                     </div>
                     <div>
                        <Checkbox
                           label="Animated"
                           defaultChecked={selectedEdge.animated}
                           radius="md"
                           size="xs"
                           onChange={(e) => {
                              onAnimatedChange(e.target.checked);
                           }}
                        />
                     </div>
                     <div>
                        <ColorInput
                           placeholder="Edge Color"
                           defaultValue={selectedEdge.style?.stroke}
                           label="Edge Color"
                           onChange={(value) => {
                              onColorChange(value);
                           }}
                        />
                     </div>
                  </SimpleGrid>
               </Paper>
            </Card.Section>
         </Card>
      </RenderIf>
   );
}
