import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {ConnectedRouter, routeMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from 'history';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import createPalette from 'material-ui/styles/createPalette';
import {createStore} from 'store';
import Saga from 'saga';

import Dashboard from 'views/dashboard/dashboard';
import ProjectCreate from 'views/project/project-create';

const theme = createMuiTheme({
    palette: createPalette({

    }),
});

const history = createBrowserHistory();

class Index extends React.Component {
    render() {
        // setup store and middleware.
        const sagaMiddleware = createSagaMiddleware();
        const store = createStore(
            applyMiddleware(sagaMiddleware),
        )
        sagaMiddleware.run(Saga);

        // initialize appliction request.
        store.dispatch({'type': 'init/app/request'}) // TODO: Const値からTypeを取得する

        // run application.
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path='/' component={Dashboard} />
                            <Route exact path='/project/new' component={ProjectCreate} />
                        </Switch>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.querySelector('.app')
);