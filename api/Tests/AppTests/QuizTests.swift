//
// Created by Chris Bishop on 2018-04-05.
//

import Foundation
import HTTP
import XCTest
@testable import Vapor
@testable import App



final class QuizTests : XCTestCase {

    func testCreateQuiz() throws {
        // Preparing to Test
        let app = try Application()
        let course = Course(title: "Intro to Software Engineering", description: "Really cool course!", courseCode: "CPS406", teacherID: 1, school: "Ryerson")
        let quiz = Quiz(courseID: 1, title: "Quiz - Week 1")

        let json = try JSONEncoder().encode(CourseQuizJSON(course: course, quiz: quiz))
        let reqBody = HTTPBody(json)

        // Testing
        let req = HTTPRequest(method: .post, uri: "/api/courses/1/quizzes", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }


    func testViewAllQuizzes() throws {
        // Preparing to Test
        let app = try Application()
        let reqBody = HTTPBody()

        // Testing
        let req = HTTPRequest(method: .get, uri: "/api/courses/1/quizzes", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }

    func testViewAQuiz() throws {
        // Preparing to Test
        let app = try Application()
        let reqBody = HTTPBody()

        // Testing
        let req = HTTPRequest(method: .get, uri: "/api/courses/1/quizzes/1", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }

    func testCreateQuestions() throws {
        // Preparing to Test
        let app = try Application()
        let course = Course(title: "Intro to Software Engineering", description: "Really cool course!", courseCode: "CPS406", teacherID: 1, school: "Ryerson")
        let quiz = Quiz(courseID: 1, title: "Quiz - Week 1")
        let question = Question(quizID: 1, question: "What is the Capital of Canada", optionA: "Toronto", optionB: "New York", optionC: "Ottawa", optionD: "None of the above", answer: "Ottawa")

        let json = try JSONEncoder().encode(CourseQuizQuestionJSON(course: course, quiz: quiz, question: question))
        let reqBody = HTTPBody(json)

        // Testing
        let req = HTTPRequest(method: .post, uri: "/api/courses/1/students/1", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }


    // ---------- ALL TESTS ----------
    static let allTests = [
        ("testCreateQuiz", testCreateQuiz),
        ("testViewAllQuizzes", testViewAllQuizzes),
        ("testViewAQuiz", testViewAQuiz),
        ("testEnrollInACourse", testCreateQuestions),
    ]

}

class CourseQuizJSON: Codable {
    var course: Course
    var quiz: Quiz

    init(course: Course, quiz: Quiz) {
        self.course = course
        self.quiz = quiz
    }
}

class CourseQuizQuestionJSON: Codable {
    var course: Course
    var quiz: Quiz
    var question: Question

    init(course: Course, quiz: Quiz, question: Question) {
        self.course = course
        self.quiz = quiz
        self.question = question
    }
}
