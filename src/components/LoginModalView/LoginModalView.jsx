import { Button, Modal, Space, Stack } from "@mantine/core";
import { client_Id } from "../../utils/util";
export default function LoginModalView() {
   const handleProdOauth = () => {
      let instance = "https://login.salesforce.com";
      let url = `${instance}/services/oauth2/authorize?client_id=${client_Id}&redirect_uri=http://localhost:3000/callback&response_type=token`;
      window.open(url, "_self");
   };
   const handleTestOauth = () => {
      let instance = "https://test.salesforce.com";
      let url = `${instance}/services/oauth2/authorize?client_id=${client_Id}&redirect_uri=http://localhost:3000/callback&response_type=token`;
      window.open(url, "_self");
   };
   return (
      <div>
         <Modal title="Login to Salesforce Org" opened={true} withCloseButton={false} closeOnClickOutside={false}>
            <Stack>
               <Button fullWidth size="xl" onClick={handleProdOauth}>
                  Login to Production
               </Button>
               <Space h="md" />
               <Button fullWidth size="xl" onClick={handleTestOauth}>
                  Login to Sandbox
               </Button>
            </Stack>
         </Modal>
      </div>
   );
}
