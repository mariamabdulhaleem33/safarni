import { BrowserRouter } from "react-router-dom";
import PaymentPage from "./components/checkout/PaymentPage";

const App = () => {
  return (
    <BrowserRouter>
      <PaymentPage />
    </BrowserRouter>
  );
};

export default App;

