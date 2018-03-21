// @flow

import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import '../../styles/courses/CourseList.scss';
import type { Course } from '../../utils/types';

type Props = {
    courses: Course[],
};

const CourseList = ({ courses }: Props) => (
    <ListGroup className="course-list">
        {
            courses.length > 0 ? courses.map(course => (
                <ListGroupItem key={course.id} className="course-list-item">
                    {course.title}
                </ListGroupItem>
            )) : <h5>No courses to display.</h5>
        }
    </ListGroup>
);

export default CourseList;
