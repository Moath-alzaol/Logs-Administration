import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./assets/style/main.scss";
import Administration from "./components/pages/Administration";
import Home from "./components/pages/Home";
import LoggerSearch from "./components/pages/LoggerSearch";

function App() {
    return (
        <div className="App">
            <BrowserRouter basename="/">
                <Switch>
                    <Route component={LoggerSearch} path="/LoggerSearch/:page?/:fromDate?/:toDate?/:name?/:action?/:applicationType?/:appId?" />
                    <Route component={Administration} path="/Administration" />
                    <Route component={Home} path="/home" />
                    <Redirect to="/LoggerSearch/1" />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
