import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Timeline from "../pages/Timeline";
import TagPage from "../pages/TagPosts";
import UserPage from "../pages/UserPosts";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path='/sign-up' element={<Signup />} />
                <Route path='/timeline' element={<Timeline />} />
                <Route path='/hashtag/:hashtag' element={<TagPage />} />
                <Route path='/user/:id' element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;