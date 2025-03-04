import { createContext, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import Store from "./store/store"
import  "./css/App.scss"
import Header from "./pages/Header"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Suspense } from "react"
import ErrorBoundary from "./pages/errors/ErrorBoundary"
import { Login, Registration, Games, Game, Profile, Users, ForFor, Test } from "./lazyImports";

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
                            <Route path="/test" element={<Test />} />
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