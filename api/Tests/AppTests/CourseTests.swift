//
// Created by Chris Bishop on 2018-04-05.
//

import Foundation
import HTTP
import XCTest
@testable import Vapor
@testable import App


final class CourseTests : XCTestCase {

    func testCreateCourse() throws {
        // Preparing to Test
        let app = try Application()
        let course = Course(title: "Intro to Software Engineering", description: "Really cool course!", courseCode: "CPS406", teacherID: 1, school: "Ryerson")

        let json = try JSONEncoder().encode(course)
        let reqBody = HTTPBody(json)

        // Testing
        let req = HTTPRequest(method: .post, uri: "/api/courses", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }


    func testViewAllCourses() throws {
        // Preparing to Test
        let app = try Application()
        let reqBody = HTTPBody()

        // Testing
        let req = HTTPRequest(method: .get, uri: "/api/courses", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }

    func testViewACourse() throws {
        // Preparing to Test
        let app = try Application()
        let reqBody = HTTPBody()

        // Testing
        let req = HTTPRequest(method: .get, uri: "/api/courses/1", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }

    func testEnrollInACourse() throws {
        // Preparing to Test
        let app = try Application()
        let username = "Bob", school = "Ryerson", pass = "pass123"
        let user = User(username: username,school: school,password: pass)
        let course = Course(title: "Intro to Software Engineering", description: "Really cool course!", courseCode: "CPS406", teacherID: 1, school: "Ryerson")


        let json = try JSONEncoder().encode(UserCourseJSON(user: user, course: course))
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
        ("testCreateCourse", testCreateCourse),
        ("testViewAllCourses", testViewAllCourses),
        ("testViewACourse", testViewACourse),
        ("testEnrollInACourse", testEnrollInACourse),
    ]
}

class UserCourseJSON: Codable {
    var user: User
    var course: Course

    init(user: User, course: Course) {
        self.user = user
        self.course = course
    }
}

