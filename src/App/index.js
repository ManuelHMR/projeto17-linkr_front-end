import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./../pages/Timeline";
import TagPage from "../pages/TagPosts";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/timeline' element={<Timeline />} />
                <Route path='/hashtag' element={<TagPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;