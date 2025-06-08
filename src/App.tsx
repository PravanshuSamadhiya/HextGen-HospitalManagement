import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <AppRoutes />
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App;