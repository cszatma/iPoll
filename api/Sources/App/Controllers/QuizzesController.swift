//
// Created by Chris Bishop on 2018-03-16.
//

import Foundation
import Vapor

struct QuizzesController: RouteCollection {
    func boot(router: Router) throws {
        let quizzesRoute = router.grouped("api", "quizzes")

        quizzesRoute.get(use: getAllHandler)
        quizzesRoute.post("for-course", Course.parameter, use:createHandler)
        quizzesRoute.put(Quiz.parameter, use: updateHandler)
        quizzesRoute.get(Quiz.parameter, use: getHandler)
        quizzesRoute.get(Quiz.parameter, "course", use: getCourseHandler)


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

    // To be Tested
    func updateHandler(_ req: Request) throws -> Future<Quiz> {
        return try flatMap(to: Quiz.self, req.parameter(Quiz.self), req.content.decode(QuizCreateData.self)) { quiz, updatedQuiz in
            quiz.title = updatedQuiz.title
            return quiz.save(on: req)
        }
    }

    func getHandler(_ req: Request) throws -> Future<Quiz> {
        return try req.parameter(Quiz.self)
    }

    func getCourseHandler(_ req: Request) throws -> Future<Course> {
        return try req.parameter(Quiz.self).flatMap(to: Course.self) { quiz in
            return quiz.course.get(on: req)
        }
    }

}

extension Quiz: Parameter {}

struct QuizCreateData: Content {
    let title: String
}