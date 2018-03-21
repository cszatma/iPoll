// @flow

import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import { asyncReactor } from 'async-reactor';

import client from '../../Client';
import CubeLoader from '../CubeLoader';
import CourseList from './CourseList';

const Courses = async () => {
    const ownedCourses = await client.getCourses('owned');
    const enrolledCourses = await client.getCourses('enrolled');

    return (
        <Container>
            <h1>Courses</h1>
            <Link to="/courses/create" className="btn btn-secondary mb-3 mr-2 text-white">
                Create new course
            </Link>
            <Link to="/courses/enroll" className="btn btn-secondary mb-3 text-white">
                Enroll in a course
            </Link>
            <Jumbotron>
                <h3>Courses you are teaching:</h3>
                <CourseList courses={ownedCourses} />
            </Jumbotron>
            <Jumbotron>
                <h3>Courses enrolled in:</h3>
                <CourseList courses={enrolledCourses} />
            </Jumbotron>
        </Container>
    );
};

export default asyncReactor(Courses, CubeLoader);
