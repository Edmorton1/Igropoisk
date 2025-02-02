import { useContext, createContext, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import Login from "./pages/login/Login"
import Store from "./store/store"
import Header from "./pages/Header"
import Registration from "./pages/registration/Registration"
import Main from "./pages/main/Main"
import Games from "./pages/Games/Games"
import Game from "./pages/Games/Game"
import "./css/App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const Context = createContext<Store>(null)

function App() {
    const [store] = useState(new Store());
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            await store.refresh();
            setLoad(true);
        };
    
        fetchData();
    }, [])

    if (load) {
        return(
            <Context.Provider value={store}>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="registration" element={<Registration />} />
                        <Route path="games" element={<Games />} />
                        <Route path="games/:id" element={<Game />} />
                        <Route index element={<Main />} />
                    </Routes>
                </BrowserRouter>
            </Context.Provider>
        )
    } return(
        <div>Загрузка</div>
    )
}

export default observer(App)