import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditContext from "./lib/context/EditContext";
import { useState } from "react";

const App = () => {

  const [isEdit, setIsEdit] = useState(false);

  return (
    <EditContext.Provider value={[isEdit, setIsEdit]}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </EditContext.Provider>
  );
};

export default App;
