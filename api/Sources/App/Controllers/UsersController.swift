//
// Created by Chris Bishop on 2018-03-16.
//

import Vapor
import Authentication

struct UsersController: RouteCollection {
    func boot(router: Router) throws {
        let usersRoutes = router.grouped("api", "users")
        usersRoutes.post(use: createHandler)
        usersRoutes.get(use: getAllHandler)
        usersRoutes.get(User.Public.parameter, use: getHandler)
        usersRoutes.get("owned-courses", User.parameter, use: getOwnedCoursesHandler)
        usersRoutes.get("enrolled", User.parameter, use: getEnrolledCoursesHandler)
        usersRoutes.post("enroll", User.parameter, "in-course", Course.parameter, use: enrollInCoursesHandler)

        let basicAuthMiddleware = User.basicAuthMiddleware(using: BCryptVerifier())
        let basicAuthGroup = usersRoutes.grouped(basicAuthMiddleware)
        basicAuthGroup.post("login", use: loginHandler)
    }

    // WORKS
    func createHandler(_ req: Request) throws -> Future<User> {
        return try req.content.decode(User.self).flatMap(to: User.self) { user in
            let hasher = try req.make(BCryptHasher.self)
            user.password = try hasher.make(user.password)
            return user.save(on: req)
        }
    }

    // WORKS
    func getAllHandler(_ req: Request) throws -> Future<[User.Public]> {
        return User.Public.query(on: req).all()
    }

    // WORKS
    func getHandler(_ req: Request) throws -> Future<User.Public> {
        return try req.parameter(User.Public.self)
    }

    // WORKS
    func loginHandler(_ req: Request) throws -> Future<Token> {
        let user = try req.requireAuthenticated(User.self)
        let token = try Token.generate(for: user)
        return token.save(on: req)
    }

    // WORKS
    func getOwnedCoursesHandler(_ req: Request) throws -> Future<[Course]> {
        return try req.parameter(User.self).flatMap(to: [Course].self){ user in
            return try user.ownedCourses.query(on: req).all()
        }
    }

    // WORKS
    func getEnrolledCoursesHandler(_ req: Request) throws -> Future<[Course]> {
        return try req.parameter(User.self).flatMap(to: [Course].self) { user in
            return try user.enrolledCourses.query(on: req).all()
        }
    }

    // WORKS
    func enrollInCoursesHandler(_ req: Request) throws -> Future<HTTPStatus> {
        return try flatMap(to: HTTPStatus.self, req.parameter(User.self), req.parameter(Course.self)) { user, course in
            let pivot = try UserCoursePivot(user.requireID(), course.requireID())
            return pivot.save(on: req).transform(to: .ok)
        }
    }

}

extension User: Parameter {}
extension User.Public: Parameter {}
