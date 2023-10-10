import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";
import { RootState } from "./store/index";
import NewPage from "../src/pages/NewPage/NewPage";
import Header from "../src/pages/Header/Header";

import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.yourStateSlice.data);
  const loading = useSelector(
    (state: RootState) => state.yourStateSlice.loading
  );
  const error = useSelector((state: RootState) => state.yourStateSlice.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(data, "data");
  return (
    <div className="App">
      {/* Define routes */}
      <main>
        <Routes>
          <Route path="/new" element={<NewPage />} />
          <Route path="/" element={<Header />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
