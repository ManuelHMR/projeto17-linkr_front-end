import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./pages/Timeline";

import TrendingTags from "./tagsBox";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/timeline' element={<Timeline />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;