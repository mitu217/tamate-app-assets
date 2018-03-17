import * as React from 'react';
import {compose} from 'redux';
import {connect, Dispatch} from 'react-redux';
import { Switch, Route, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import {ReduxState, ReduxAction} from 'store';
import {withStyles} from 'material-ui/styles';
import Dashboard from 'components/dashboard';
import Project from 'containers/project';
import {TableData} from 'components/row-data';
import SchemaDetail from 'components/schema/detail';

interface Props {
    classes: object;
}

const styles = theme => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    toolbar: theme.mixins.toolbar,
});

export class Content extends React.Component<Props, {}> {
    render() {
        const classes = this.props.classes
        return (
            <main className={classes['content']}>
                <div className={classes['toolbar']} />
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    {/* Projects */}
                    <Route exact path='/projects' component={Project} />
                    <Route path='/projects/:id' component={Project} />
                    {/* Schemas */}
                    <Route exact path='/schemas' component={SchemaDetail} />
                    <Route path='/schemas/:id' component={SchemaDetail} />
                    {/* DataSources */}
                    <Route exact path='/datasources' component={TableData} />
                    <Route path='/datasources/:id' component={TableData} />
                    {/* Other */}
                    <Route path='/profile' />
                    <Route path='/settings' />
                </Switch>
            </main>
        )
    }
}

export class ActionDispatcher {
    constructor(private dispatch: (action: ReduxAction) => void) {}
}

export default compose(
    withStyles(styles, { name: 'Content' }),
    connect(
        (state: ReduxState) => ({values: state.tab}),
        (dispatch: Dispatch<ReduxAction>) => ({actions: new ActionDispatcher(dispatch)})
    )
)(Content)
