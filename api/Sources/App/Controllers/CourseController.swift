import Vapor
import Fluent

struct CoursesController: RouteCollection {
    func boot(router: Router) throws {
        let coursesRoute = router.grouped("api", "courses")

        coursesRoute.get(use: getAllHandler)

        // Authentication with Token
        let tokenAuthMiddleware = User.tokenAuthMiddleware()
        let tokenAuthGroup = coursesRoute.grouped(tokenAuthMiddleware)

        tokenAuthGroup.post(use: createHandler)

    }

    func getAllHandler(_ req: Request) throws -> Future<[Course]> {
        return Course.query(on: req).all()
    }

    func createHandler(_ req: Request) throws -> Future<Course> {
        return try req.content.decode(CourseCreateData.self).flatMap(to: Course.self) { courseData in
            let user = try req.requireAuthenticated(User.self)
            let course = try Course(title: courseData.title, description: courseData.description, courseCode: courseData.courseCode, teacherID: user.requireID())
            return course.save(on: req)
        }
    }


}

extension Course: Parameter {}

struct CourseCreateData: Content {
    let title: String
    let description: String
    let courseCode: String
}