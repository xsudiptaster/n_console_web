import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import LoginModalView from "./components/LoginModalView/LoginModalView.jsx";
import MainLayoutView from "./components/MainLayoutView/MainLayoutView.jsx";
import SaveTokenView from "./components/SaveTokenView/SaveTokenView.jsx";
const router = createBrowserRouter([
   {
      path: "/",
      element: <LoginModalView />,
   },
   {
      path: "/callback",
      element: <SaveTokenView />,
   },
   {
      path: "/home",
      element: <MainLayoutView />,
   },
]);
function App() {
   return (
      <div>
         <ColorSchemeProvider colorScheme="dark">
            <MantineProvider
               theme={{
                  colorScheme: "dark",
                  colors: {
                     // override dark colors to change them for all components
                     dark: [
                        "#C1C2C5",
                        "#A6A7AB",
                        "#909296",
                        "#5C5F66",
                        "#373A40",
                        "#2C2E33",
                        "#25262B",
                        "#1A1B1E",
                        "#141517",
                        "#101113",
                     ],
                  },
                  fontFamily: "Open Sans, sans serif",
                  fontSizes: {
                     xs: "0.6rem",
                     sm: "0.7rem",
                     md: "0.9rem",
                     lg: "1rem",
                     xl: "1.2rem",
                  },
                  lineHeight: 1,
                  primaryColor: "dark",
                  spacing: { xs: "0.3rem", sm: "0.5rem", md: "0.8rem", lg: "1rem", xl: "1.5rem" },
                  cursorType: "pointer",
                  defaultRadius: "xs",
                  defaultSpacing: "xs",
               }}
               withGlobalStyles
               withNormalizeCSS
            >
               <RecoilRoot>
                  <RouterProvider router={router} />
               </RecoilRoot>
            </MantineProvider>
         </ColorSchemeProvider>
      </div>
   );
}

export default App;
