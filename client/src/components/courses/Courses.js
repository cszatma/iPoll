// @flow

import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';

import CourseList from './CourseList';
import type { Course } from '../../utils/types';

type Props = {
    ownedCourses: Course[],
    enrolledCourses: Course[],
};

const Courses = ({ ownedCourses, enrolledCourses }: Props) => (
    <Container>
        <h1>Courses</h1>
        <Link
            to="/courses/create"
            className="btn btn-secondary mb-3 mr-2 text-white"
        >
            Create new course
        </Link>
        <Link
            to="/courses/enroll"
            className="btn btn-secondary mb-3 text-white"
        >
            Enroll in a course
        </Link>
        <Jumbotron>
            <h3>Courses you are teaching:</h3>
            <CourseList courses={ownedCourses} shouldLink />
        </Jumbotron>
        <Jumbotron>
            <h3>Courses enrolled in:</h3>
            <CourseList courses={enrolledCourses} shouldLink />
        </Jumbotron>
    </Container>
);

export default Courses;
