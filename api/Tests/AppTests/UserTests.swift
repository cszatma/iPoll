//
// Created by Chris Bishop on 2018-04-05.
//

import Foundation
import HTTP
import XCTest
@testable import Vapor
@testable import App



final class UserTests : XCTestCase {

    func testCreateUser() throws {
        // Preparing to Test
        let app = try Application()
        let username = "Bob", school = "Ryerson", pass = "pass123"
        let user = User(username: username,school: school,password: pass)

        let json = try JSONEncoder().encode(user)
        let reqBody = HTTPBody(json)

        // Testing
        let req = HTTPRequest(method: .post, uri: "/api/users", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }

    func testAuthentication() throws {
        // Preparing to Test
        let app = try Application()
        let username = "Bob", school = "Ryerson", pass = "pass123"
        let user = User(username: username,school: school,password: pass)
        let json = try JSONEncoder().encode(user)
        let reqBody = HTTPBody(json)

        // Testing
        let req = HTTPRequest(method: .post, uri: "/api/users/login", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }

    func testLogout() throws {
        // Preparing to Test
        let app = try Application()
        let username = "Bob", school = "Ryerson", pass = "pass123"
        let user = User(username: username,school: school, password: pass)
        let json = try JSONEncoder().encode(user)
        let reqBody = HTTPBody(json)

        // Testing
        let req = HTTPRequest(method: .delete, uri: "/api/tokens", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }

    func testViewAllUsers() throws {
        // Preparing to Test
        let app = try Application()
        let reqBody = HTTPBody()

        // Testing
        let req = HTTPRequest(method: .get, uri: "/api/users", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }

    func testViewAUser() throws {
        // Preparing to Test
        let app = try Application()
        let reqBody = HTTPBody()

        // Testing
        let req = HTTPRequest(method: .get, uri: "/api/users/1", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }

    func testCheckingToken() throws {
        // Preparing to Test
        let app = try Application()
        let username = "Bob", school = "Ryerson", pass = "pass123"
        let user = User(username: username,school: school, password: pass)
        let json = try JSONEncoder().encode(user)
        let reqBody = HTTPBody(json)

        // Testing
        let req = HTTPRequest(method: .get, uri: "/api/tokens/check-token", version: .init(major: 1, minor: 1), headers: ["Content-Type": "application/json"], body: reqBody)
        let res = Request.init(http: req, using: app)
        let status = res.makeResponse().http.status

        // Response is 200 OK
        XCTAssertEqual(status, 200)
    }


    // ---------- ALL TESTS ----------
    static let allTests = [
        ("testCreateUser", testCreateUser),
        ("testAuthentication", testAuthentication),
        ("testLogout", testLogout),
        ("testViewAllUsers", testViewAllUsers),
        ("testViewAUser", testViewAUser),
        ("testCheckingToken", testCheckingToken),
    ]
}
