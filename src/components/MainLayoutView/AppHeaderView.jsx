import { ActionIcon, Avatar, Button, Container, Group, Header, Menu, Tooltip } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useRecoilState } from "recoil";
import { Home, Logout } from "tabler-icons-react";
import { selectedAppAtom } from "../../atoms/atom";
import { handleLogout } from "./MainLayoutView.util";

export function AppHeaderView({ links, identity }) {
   const [, setSelectedApp] = useRecoilState(selectedAppAtom);
   const items = links.map((link) => {
      const menuItems = link.children?.map((item) => (
         <Menu.Item key={item.link} size="md">
            {item.label}
         </Menu.Item>
      ));
      if (menuItems) {
         return (
            <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal size="md">
               <Menu.Target>
                  <Button variant="subtle" label={link.label} rightIcon={<IconChevronDown size="0.9rem" stroke={1.5} />}>
                     {link.label}
                  </Button>
               </Menu.Target>
               <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
         );
      }

      return (
         <Button
            variant="subtle"
            key={link.link}
            size="md"
            onClick={() => {
               setSelectedApp(link.link);
            }}
         >
            {link.label}
         </Button>
      );
   });

   return (
      <Header height={46}>
         <Container style={{ paddingLeft: "30px" }} fluid>
            <Group grow>
               <Group>
                  <Home strokeWidth={2} /> <>NConsole</>
                  <div>{items}</div>
               </Group>
               <Group spacing={0}></Group>
               <Container style={{ float: "right" }} fluid>
                  <Group>
                     <Avatar src={identity?.photos?.picture} size="xs" radius="xl" /> {identity?.display_name}
                     <Tooltip label="logout">
                        <ActionIcon
                           variant="transparent"
                           onClick={() => {
                              handleLogout();
                           }}
                        >
                           <Logout size={24} strokeWidth={2} />
                        </ActionIcon>
                     </Tooltip>
                  </Group>
               </Container>
            </Group>
         </Container>
      </Header>
   );
}
