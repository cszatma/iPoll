//
// Created by Chris Bishop on 2018-03-16.
//

import Vapor
import Fluent

struct CoursesController: RouteCollection {
    func boot(router: Router) throws {
        let coursesRoute = router.grouped("api", "courses")

        // Unauthenticated Routes
        coursesRoute.get(use: getAllHandler)
        coursesRoute.get(Course.parameter, use: getHandler)
        coursesRoute.get(Course.parameter, "teacher", use: getTeacherHandler)
        coursesRoute.get("search", use: searchHandler)
        coursesRoute.get(Course.parameter, "students", use: getStudentsHandler)
        coursesRoute.post(Course.parameter, "students", User.parameter, use:enrollInCoursesHandler)

        // Authentication with Token
        let tokenAuthMiddleware = User.tokenAuthMiddleware()
        let tokenAuthGroup = coursesRoute.grouped(tokenAuthMiddleware)

        // Authenticated Routes
        tokenAuthGroup.post(use: createHandler)
        tokenAuthGroup.delete(Course.parameter, use: deleteHandler)
        tokenAuthGroup.put(Course.parameter, use: updateHandler)

    }

    // WORKS
    func getAllHandler(_ req: Request) throws -> Future<[Course]> {
        return Course.query(on: req).all()
    }

    // WORKS
    func getHandler(_ req: Request) throws -> Future<Course> {
        return try req.parameter(Course.self)
    }

    // WORKS
    func createHandler(_ req: Request) throws -> Future<Course> {
        return try req.content.decode(CourseCreateData.self).flatMap(to: Course.self) { courseData in
            let user = try req.requireAuthenticated(User.self)
            let course = try Course(title: courseData.title, description: courseData.description, courseCode: courseData.courseCode, teacherID: user.requireID())
            return course.save(on: req)
        }
    }

    // WORKS
    func deleteHandler(_ req: Request) throws -> Future<HTTPStatus> {
        return try req.parameter(Course.self).flatMap(to: HTTPStatus.self) { course in
            return course.delete(on: req).transform(to: .noContent)
        }
    }

    // WORKS
    func updateHandler(_ req: Request) throws -> Future<Course> {
        return try flatMap(to: Course.self, req.parameter(Course.self), req.content.decode(CourseCreateData.self)) { course, updatedCourse in
            course.title = updatedCourse.title
            course.courseCode = updatedCourse.courseCode
            course.description = updatedCourse.description
            course.teacherID = try req.requireAuthenticated(User.self).requireID()
            return course.save(on: req)
        }
    }

    // WORKS
    func getTeacherHandler(_ req: Request) throws -> Future<User> {
        return try req.parameter(Course.self).flatMap(to: User.self) { course in
            return course.teacher.get(on: req)
        }
    }

    // ONLY WORKS ON EXACT MATCH
    func searchHandler(_ req: Request) throws -> Future<[Course]> {
        guard let searchTerm = req.query[String.self, at: "term"] else {
            throw Abort(.badRequest, reason: "Missing a search term in the request")
        }
        return Course.query(on: req).group(.or) { or in
            or.filter(\.title == searchTerm)
            or.filter(\.courseCode == searchTerm)
            or.filter(\.description == searchTerm)
        }.all()
    }

    // WORKS
    func getStudentsHandler(_ req: Request) throws -> Future<[User]> {
        return try req.parameter(Course.self).flatMap(to: [User].self) { course in
            return try course.students.query(on: req).all()
        }
    }

    // WORKS
    func enrollInCoursesHandler(_ req: Request) throws -> Future<HTTPStatus> {
        return try flatMap(to: HTTPStatus.self, req.parameter(Course.self), req.parameter(User.self)) { course, user in
            let pivot = try UserCoursePivot(user.requireID(), course.requireID())
            return pivot.save(on: req).transform(to: .ok)
        }
    }


}

extension Course: Parameter {}

struct CourseCreateData: Content {
    let title: String
    let description: String
    let courseCode: String
}