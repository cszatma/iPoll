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

        // Authentication with Token
        let tokenAuthMiddleware = User.tokenAuthMiddleware()
        let tokenAuthGroup = coursesRoute.grouped(tokenAuthMiddleware)

        // Authenticated Routes
        tokenAuthGroup.post(use: createHandler)
        tokenAuthGroup.delete(Course.parameter, use: deleteHandler)
        tokenAuthGroup.put(Course.parameter, use: updateHandler)

    }

    func getAllHandler(_ req: Request) throws -> Future<[Course]> {
        return Course.query(on: req).all()
    }

    func getHandler(_ req: Request) throws -> Future<Course> {
        return try req.parameter(Course.self)
    }

    func createHandler(_ req: Request) throws -> Future<Course> {
        return try req.content.decode(CourseCreateData.self).flatMap(to: Course.self) { courseData in
            let user = try req.requireAuthenticated(User.self)
            let course = try Course(title: courseData.title, description: courseData.description, courseCode: courseData.courseCode, teacherID: user.requireID())
            return course.save(on: req)
        }
    }

    func deleteHandler(_ req: Request) throws -> Future<HTTPStatus> {
        return try req.parameter(Course.self).flatMap(to: HTTPStatus.self) { course in
            return course.delete(on: req).transform(to: .noContent)
        }
    }

    // Has a problem with Teacher ID ** FIX TO BE TESTED **
    func updateHandler(_ req: Request) throws -> Future<Course> {
        return try flatMap(to: Course.self, req.parameter(Course.self), req.content.decode(CourseCreateData.self)) { course, updatedCourse in
            course.title = updatedCourse.title
            course.courseCode = updatedCourse.courseCode
            course.description = updatedCourse.description
            course.teacherID = try req.requireAuthenticated(User.self).requireID()
            return course.save(on: req)
        }
    }

    // Currently Shows full User with hashed password, but user public seems to bring errors
    func getTeacherHandler(_ req: Request) throws -> Future<User> {
        return try req.parameter(Course.self).flatMap(to: User.self) { course in
            return course.teacher.get(on: req)
        }
    }

    // Can search but doesnt give any results
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


}

extension Course: Parameter {}

struct CourseCreateData: Content {
    let title: String
    let description: String
    let courseCode: String
}