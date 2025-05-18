import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          Root Layout
          <Outlet />
        </div>
      ),
      children: [
        {
          index: true,
          element: (
            <div>
              {" "}
              <Home />{" "}
            </div>
          ),
        },
        {
          path: "auth",
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "signup",
              element: <Signup />,
            },
          ],
        },
        {
          path: "chat",
          element: (
            <div>
              Chat Layout <Outlet />
            </div>
          ),
          children: [
            {
              path: "room",
              element: <div>Chat Room Page</div>,
            },
            {
              path: "roomId",
              element: <div>Chat Room ID Page</div>,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
