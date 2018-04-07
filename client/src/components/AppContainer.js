import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import NotFound from './NotFound';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Courses from './courses/Courses';
import CreateCourse from './courses/CreateCourse';
import CourseDetails from './courses/CourseDetails';
import CubeLoader from './common/CubeLoader';
import client from '../Client';
import actionCreators from '../utils/actionCreators';

type Props = {
    courses: Course[],
    setCourses: (Course[]) => void,
};

type State = {
    fetchInProgress: boolean,
};

const sidebarItems = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Courses', url: '/courses' },
    { name: 'Account', url: '/account' },
    { name: 'Logout', url: '/logout' },
];

class AppContainer extends PureComponent<Props, State> {
    state = {
        fetchInProgress: false,
    };

    constructor(props: {}) {
        super(props);
        client.subscribe(isValid => !isValid && this.forceUpdate());
    }

    async componentWillMount() {
        // If logged in fetch courses and add them to the redux store for quick access
        if (client.isLoggedIn()) {
            this.setState({ fetchInProgress: true });

            const ownedCourses = await client.getCourses('owned');
            const enrolledCourses = await client.getCourses('enrolled');

            this.props.setCourses(ownedCourses, 'owned');
            this.props.setCourses(enrolledCourses, 'enrolled');
            this.setState({ fetchInProgress: false });
        }
    }

    findCourse(id: number): Course {
        const { ownedCourses, enrolledCourses } = this.props.courses;
        return [...ownedCourses, ...enrolledCourses].find(
            course => course.id === id,
        );
    }

    render() {
        if (!client.isLoggedIn()) {
            return <Redirect to="/login" />;
        } else if (this.state.fetchInProgress) {
            return <CubeLoader />;
        }

        const { ownedCourses, enrolledCourses } = this.props.courses;

        return (
            <Container fluid>
                <Row>
                    <Sidebar items={sidebarItems} />
                    <Col md="9" className="mt-3">
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to="/dashboard" />}
                            />
                            <Route path="/dashboard" component={Dashboard} />
                            <Route
                                exact
                                path="/courses"
                                render={routeProps => (
                                    <Courses
                                        {...routeProps}
                                        ownedCourses={ownedCourses}
                                        enrolledCourses={enrolledCourses}
                                    />
                                )}
                            />
                            <Route
                                path="/courses/create"
                                component={CreateCourse}
                            />
                            <Route
                                path="/courses/:courseId"
                                render={({ match }) => {
                                    const course = this.findCourse(
                                        parseInt(match.params.courseId, 10),
                                    );
                                    return <CourseDetails course={course} />;
                                }}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state: State): Props {
    return {
        courses: state.courses,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        setCourses: (courses, courseType) =>
            dispatch(actionCreators.setCourses(courses, courseType)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
