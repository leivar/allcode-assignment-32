import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import editContext from "./lib/context/editContext";
import { useState } from "react";

const App = () => {

  const [isEdit, setIsEdit] = useState(false);

  return (
    <editContext.Provider value={[isEdit, setIsEdit]}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </editContext.Provider>
  );
};

export default App;
