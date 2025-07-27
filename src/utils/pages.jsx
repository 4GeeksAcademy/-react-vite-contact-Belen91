import {GardenPage} from "../pages/GardenPage"
import {TaskListPage} from "../pages/TaskListPage"

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
    }
]