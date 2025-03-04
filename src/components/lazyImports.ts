import { lazy } from "react"

export const Login = lazy(() => import("./pages/login/Login"))
export const Registration = lazy(() => import("./pages/registration/Registration"))
export const Games = lazy(() => import("./pages/games/gamesList/Games"))
export const Game = lazy(() => import("./pages/games/game/Game"))
export const Profile = lazy(() => import("./pages/profile/Profile"))
export const Users = lazy(() => import("./pages/users/Users"))
export const ForFor = lazy(() => import("./pages/errors/ForFor"))
export const Test = lazy(() => import('./Test'))