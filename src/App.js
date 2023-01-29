import './App.css';
import {Link, Outlet, Route, Routes} from "react-router-dom";
import {Button, ConfigProvider} from "antd";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                },
            }}
        >
            <div className="App">
                <Routes>
                    <Route path={"/"} element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                    </Route>
                </Routes>
            </div>
        </ConfigProvider>
    );
}

function Layout() {
    return (
        <div>
            <nav className={"navbar"}>
                <Link to="/" className={"App-link"}>Developer Match</Link>
                <ul>
                    <li>
                        <Button type="primary">
                            <Link to="/login">Log In</Link>
                        </Button>
                    </li>
                    <li>
                        <Button type="default">
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                    </li>
                </ul>
            </nav>

            <hr/>

            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default App;
