/* eslint-disable react/jsx-no-undef */
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Tasks from "./tasks";

function App() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Navigate to="/tasks" replace/>}/>
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
