import "./App.css";
import Currency from "./Component/Currency";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="container">
          <Currency />
        </div>
      </div>
    </>
  );
}

export default App;
