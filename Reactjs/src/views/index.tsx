import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { ReactElement } from "react";

import Home from "./Home";
import User from "./User";

function WebPages(): ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="users/:id" element={<User />} />
            </Routes>
        </BrowserRouter>
    )
}

export default WebPages