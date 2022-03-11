import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import List from "./features/vessel-track/list";
import View from "./features/vessel-track/view";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<List/>}/>
                    <Route path="/:id" element={<View/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
