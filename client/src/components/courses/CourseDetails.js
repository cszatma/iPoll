// @flow

import React from 'react';
import { Container, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';

import type { Course } from '../../utils/types';

type Props = {
    course: Course,
};

const CourseDetails = ({ course }: Props) => (
    <Container>
        <Jumbotron>
            {
                course ? (
                    <div>
                        <h1>{course.title}</h1>
                        <h2>{course.courseCode}</h2>
                        <p>{course.description}</p>
                    </div>
                ) : (
                    <div>
                        <h1>Error: Course Not Found</h1>
                        <p>
                            That course does not exist.
                            Click <Link to="/courses">here</Link> to return to the list of courses.
                        </p>
                    </div>
                )
            }

        </Jumbotron>
    </Container>
);

export default CourseDetails;
