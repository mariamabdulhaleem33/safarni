import Search from "./pages/Search/Search";
import { BrowserRouter } from "react-router-dom";
import PaymentPage from "./components/checkout/PaymentPage";
import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      {/* <Search />  */}
      {/* <PaymentPage /> */}
    </BrowserRouter>
  );
};

export default App;
