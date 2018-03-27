// @flow

import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../../styles/courses/CourseList.scss';
import type { Course } from '../../utils/types';

type Props = {
    courses: Course[],
    shouldLink?: boolean,
};

const CourseList = ({ courses, shouldLink }: Props) => (
    <ListGroup className="course-list">
        {
            courses && courses.length > 0 ? courses.map(course => (
                <ListGroupItem key={course.id} className="course-list-item">
                    {
                        shouldLink ?
                            <Link
                                to={`/courses/${course.id}`}
                            >
                                {course.title}
                            </Link> :
                            course.title
                    }
                </ListGroupItem>
            )) : <h5>No courses to display.</h5>
        }
    </ListGroup>
);

export default CourseList;
