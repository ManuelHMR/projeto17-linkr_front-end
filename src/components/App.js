import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Timeline from "./pages/Timeline";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/sign-up' element={<Signup />} />
                <Route path='/timeline' element={<Timeline />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;