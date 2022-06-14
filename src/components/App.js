import { BrowserRouter, Routes, Route } from "react-router-dom";


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