import { createContext, useState, useEffect, lazy } from "react"
import { observer } from "mobx-react-lite"
import Store from "./store/store"
import "./css/App.scss"
import Header from "./pages/Header"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import ForFor from "./pages/errors/ForFor"
import ErrorBoundary from "./pages/errors/ErrorBoundary"

export const Context = createContext<Store>(null)

function App() {
    const [store] = useState(new Store());
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            await store.refresh();
            setLoad(true);
            }
    
        fetchData();
    }, [])

    const Login = lazy(() => import("./pages/login/Login"))
    const Registration = lazy(() => import("./pages/registration/Registration"))
    const Games = lazy(() => import("./pages/games/gamesList/Games"))
    const Game = lazy(() => import("./pages/games/game/Game"))
    const Profile = lazy(() => import("./pages/profile/Profile"))
    // const Test = lazy(() => import("./Test"))
    const Users = lazy(() => import("./pages/users/Users"))
    if (load) {
        return(
            <Suspense fallback={<main style={{backgroundColor: "white"}}>Загрузка приложения...</main>}>
            <Context.Provider value={store}>
                <BrowserRouter>
                    <Header />
                    <ErrorBoundary>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/registration" element={<Registration />} />
                            <Route path="/games" element={<Games />} />
                            <Route path="/games/:id" element={<Game />} />
                            <Route path="/users/:nickname" element={<Profile />}/>
                            {/* <Route path="/test" element={<Test />} /> */}
                            <Route path="/users" element={<Users/>} />
                            <Route index element={<Navigate to={`/games`} />}/>
                            <Route path="*" element={<ForFor />}/>
                        </Routes>
                    </ErrorBoundary>
                </BrowserRouter>
            </Context.Provider>
            </Suspense>
        )
    } return(
        <main style={{ backgroundColor: "white"}}>Загрузка приложения...</main>
    )
}

export default observer(App)