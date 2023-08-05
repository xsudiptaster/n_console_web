import { ActionIcon, Card, Grid, Paper, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { Handle, Position } from "reactflow";
import { useRecoilState } from "recoil";
import { selectedNodeAtom } from "../../../atoms/atom";
export default function NodeView({ id, data, label }) {
   const [, setSelectedNode] = useRecoilState(selectedNodeAtom);
   return (
      <div>
         <Card shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: "15vw" }}>
            <Card.Section>
               <ActionIcon variant="transparent" style={{ float: "right" }}>
                  <IconSettings
                     size="0.5rem"
                     onClick={() => {
                        setSelectedNode(data);
                     }}
                  />
               </ActionIcon>
            </Card.Section>
            <Card.Section style={{ paddingBottom: "10px" }}>
               <Grid>
                  <Grid.Col span={1}>
                     <Handle type="target" id={"top-" + data.name} position={Position.Top} />
                  </Grid.Col>
                  <Grid.Col span={5}>
                     <Text size="md"> {data.label}</Text>
                  </Grid.Col>
                  <Grid.Col span={5}>
                     <Text>
                        <sub>{data.name}</sub>
                     </Text>
                  </Grid.Col>
                  <Grid.Col span={1}>
                     <Handle type="target" id={"bottom-" + data.name} position={Position.Bottom} />
                  </Grid.Col>
               </Grid>
            </Card.Section>
            {data.selectedFields.map((field) => {
               return (
                  <Card.Section key={field.name}>
                     <Paper shadow="xs" p="xs" withBorder>
                        <Grid>
                           <Grid.Col span={1}>
                              <Handle
                                 type="source"
                                 id={"left-" + data.name + field.name}
                                 position={Position.Left}
                                 style={{ position: "relative" }}
                              />
                           </Grid.Col>
                           <Grid.Col span={5}>
                              <Text size="xs">{field.label}</Text>
                           </Grid.Col>
                           <Grid.Col span={5}>
                              <Text size="xs">
                                 <sub>{field.name}</sub>
                              </Text>
                           </Grid.Col>
                           <Grid.Col span={1}>
                              <Handle
                                 type="source"
                                 id={"right-" + data.name + field.name}
                                 position={Position.Right}
                                 style={{ position: "relative" }}
                              />
                           </Grid.Col>
                        </Grid>
                     </Paper>
                  </Card.Section>
               );
            })}
         </Card>
      </div>
   );
}
