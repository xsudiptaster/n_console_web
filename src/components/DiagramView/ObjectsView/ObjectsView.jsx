import { Accordion, Container, Grid, Input, Paper, Text, Tooltip } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useRecoilState } from "recoil";
import { draggedObjectAtom } from "../../../atoms/atom";
export default function ObjectsView({ objectList }) {
   const [, setDragObject] = useRecoilState(draggedObjectAtom);
   const [searchString, setSearchString] = useDebouncedState("", 200);
   return (
      <Container style={{ float: "right", minWidth: "30%" }}>
         <Accordion
            variant="contained"
            radius="xs"
            chevronPosition="right"
            defaultValue="customization"
            style={{ width: "30vw", overflow: "auto" }}
         >
            <Accordion.Item value="customization">
               <Accordion.Control>
                  <Grid gutter={0}>
                     <Grid.Col span={6}>Object List</Grid.Col>
                     <Grid.Col span={6}>
                        <Input
                           size="sx"
                           placeholder="Search Object"
                           style={{ float: "right", right: "0px" }}
                           onChange={(e) => {
                              setSearchString(e.target.value);
                           }}
                           onClick={(e) => {
                              e.stopPropagation();
                           }}
                        />
                     </Grid.Col>
                  </Grid>
               </Accordion.Control>
               <Accordion.Panel style={{ maxHeight: "90vh", overflow: "auto" }}>
                  <Grid gutter={0}>
                     {objectList
                        .filter((object) => {
                           return searchString === ""
                              ? true
                              : object.label.toUpperCase().includes(searchString.toUpperCase()) ||
                                   object.name.toUpperCase().includes(searchString.toUpperCase());
                        })
                        .map((object) => {
                           return (
                              <Grid.Col key={object.name} span={6}>
                                 <Tooltip label={object.name}>
                                    <Paper
                                       shadow="sm"
                                       radius="md"
                                       p="xs"
                                       withBorder
                                       draggable
                                       onDragStart={() => {
                                          setDragObject(object);
                                       }}
                                    >
                                       <Text size="xs"> {object.label}</Text>
                                    </Paper>
                                 </Tooltip>
                              </Grid.Col>
                           );
                        })}
                  </Grid>
               </Accordion.Panel>
            </Accordion.Item>
         </Accordion>
      </Container>
   );
}
