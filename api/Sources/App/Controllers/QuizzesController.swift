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

        // Question Routes

        tokenAuthGroup.get(Quiz.parameter, "questions", use: getAllQuestionsHandler)
        tokenAuthGroup.post(Quiz.parameter, "questions", use: createQuestionHandler)
        tokenAuthGroup.get(Quiz.parameter, "questions", Question.parameter, use: getQuestionHandler)
        tokenAuthGroup.put(Quiz.parameter, "questions", Question.parameter, use: updateQuestionHandler)
        tokenAuthGroup.delete(Quiz.parameter, "questions", Question.parameter, use: deleteQuestionHandler)

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

    // --------------- QUESTION ROUTES ---------------

    // WORKS
    func getAllQuestionsHandler(_ req: Request) throws -> Future<[Question]> {
        return try req.parameter(Quiz.self).flatMap(to: [Question].self){ quiz in
            return try quiz.questions.query(on: req).all()
        }
    }

    // WORKS
    func createQuestionHandler(_ req: Request) throws -> Future<Question> {
        return try flatMap(to: Question.self, req.parameter(Quiz.self), req.content.decode(QuestionCreateData.self)) { quiz, question in
            let question = try Question(quizID: quiz.id! , question: question.question , optionA: question.optionA , optionB: question.optionB , optionC: question.optionC , optionD: question.optionD , answer: question.answer , weight: question.weight )
            return question.save(on: req)
        }
    }

    // WORKS
    func getQuestionHandler(_ req: Request) throws -> Future<Question> {
        let quiz = try req.parameter(Quiz.self)
        let question = try req.parameter(Question.self)
        return question
    }

    // WORKS
    func updateQuestionHandler(_ req: Request) throws -> Future<Question> {
        let quiz = try req.parameter(Quiz.self)

        return try flatMap(to: Question.self, req.parameter(Question.self), req.content.decode(QuestionCreateData.self)) { question, updatedQuestion in
            question.question = updatedQuestion.question
            question.optionA = updatedQuestion.optionA
            question.optionB = updatedQuestion.optionB
            question.optionC = updatedQuestion.optionC
            question.optionD = updatedQuestion.optionD
            question.answer = updatedQuestion.answer
            question.weight = updatedQuestion.weight

            return question.save(on: req)
        }
    }

    // WORKS
    func deleteQuestionHandler(_ req: Request) throws -> Future<HTTPStatus> {
        let quiz = try req.parameter(Quiz.self)

        return try req.parameter(Question.self).flatMap(to: HTTPStatus.self) { question in
            return question.delete(on: req).transform(to: .noContent)
        }
    }


}

extension Quiz: Parameter {}

struct QuizCreateData: Content {
    let title: String
}

extension Question: Parameter {}

struct QuestionCreateData: Content {
    let question: String
    let optionA: String
    let optionB: String
    let optionC: String
    let optionD: String
    let answer: String
    let weight: Int
}
