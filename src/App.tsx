import React, {lazy, Suspense} from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const List = lazy(() => import('./modules/vessel-track/list'));
const View = lazy(() => import('./modules/vessel-track/view'));

function App() {
    return (
        <div className="App">
            <Suspense fallback="loading...">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<List/>}/>
                        <Route path="/:id" element={<View/>}/>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
