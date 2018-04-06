//
// Created by Chris Bishop on 2018-03-16.
//

import Foundation
import Vapor

struct QuizzesController: RouteCollection {
    func boot(router: Router) throws {
        let quizzesRoute = router.grouped("api", "quizzes")
        let tokenAuthMiddleware = User.tokenAuthMiddleware()
        let tokenAuthGroup = quizzesRoute.grouped(tokenAuthMiddleware)

        // Authenticated Routes
        tokenAuthGroup.get(use: getAllHandler)
        tokenAuthGroup.post("for-course", Course.parameter, use:createHandler)
        tokenAuthGroup.put(Quiz.parameter, use: updateHandler)
        tokenAuthGroup.get(Quiz.parameter, use: getHandler)
        tokenAuthGroup.get(Quiz.parameter, "course", use: getCourseHandler)
        tokenAuthGroup.delete(Quiz.parameter, use: deleteHandler)
        tokenAuthGroup.put(Quiz.parameter, "publish", use: publishHandler)
        tokenAuthGroup.put(Quiz.parameter, "unpublish", use: unpublishHandler)


    }

    // WORKS
    func getAllHandler(_ req: Request) throws -> Future<[Quiz]> {
        return Quiz.query(on: req).all()
    }

    // WORKS
    func createHandler(_ req: Request) throws -> Future<Quiz> {
        return try flatMap(to: Quiz.self, req.parameter(Course.self), req.content.decode(QuizCreateData.self)) { course, quizData in
            let quiz = try Quiz(courseID: course.id!, title: quizData.title)
            return quiz.save(on: req)
        }
    }

    // WORKS
    func updateHandler(_ req: Request) throws -> Future<Quiz> {
        return try flatMap(to: Quiz.self, req.parameter(Quiz.self), req.content.decode(QuizCreateData.self)) { quiz, updatedQuiz in
            quiz.title = updatedQuiz.title
            return quiz.save(on: req)
        }
    }

    // WORKS
    func getHandler(_ req: Request) throws -> Future<Quiz> {
        return try req.parameter(Quiz.self)
    }

    // WORKS
    func getCourseHandler(_ req: Request) throws -> Future<Course> {
        return try req.parameter(Quiz.self).flatMap(to: Course.self) { quiz in
            return quiz.course.get(on: req)
        }
    }

    // WORKS
    func deleteHandler(_ req: Request) throws -> Future<HTTPStatus> {
        return try req.parameter(Quiz.self).flatMap(to: HTTPStatus.self) { quiz in
            return quiz.delete(on: req).transform(to: .noContent)
        }
    }

    // WORKS
    func publishHandler(_ req: Request) throws -> Future<Quiz> {
        return try req.parameter(Quiz.self).flatMap(to: Quiz.self) { quiz in
            quiz.published = true
            return quiz.save(on: req)
        }
    }

    // WORKS
    func unpublishHandler(_ req: Request) throws -> Future<Quiz> {
        return try req.parameter(Quiz.self).flatMap(to: Quiz.self) { quiz in
            quiz.published = false
            return quiz.save(on: req)
        }
    }

}

extension Quiz: Parameter {}

struct QuizCreateData: Content {
    let title: String
}