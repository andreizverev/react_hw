import './App.css'
import {Provider} from "react-redux";
import {store} from "app/store";
import TaskPage from "pages/tasks/TaskPage";


function App() {
    return (
        <Provider store={store}>
            <TaskPage/>
        </Provider>
    )
}

export default App
