import {GardenPage} from "../pages/GardenPage"
import {TaskListPage} from "../pages/TaskListPage"
import { HiringPage } from "../pages/HiringPage"

export const pages = [
    {
        name: "Inicio",
        route: "/",
        component: <GardenPage />,
        showNavigation: true
    },
    {
        name: "Tareas del jardín",
        route: "/tasks",
        component: <TaskListPage/>,
        showNavigation: true
    },
    {
        name: "Contrata a tu jardinero",
        route: "/contratar",
        component: <HiringPage/>,
        showNavigation: true
    }
]