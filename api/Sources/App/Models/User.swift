//
// Created by Chris Bishop on 2018-03-16.
//

import Foundation
import FluentSQLite
import Vapor
import Authentication

final class User: Codable {
    var id: Int?
    var username: String
    var school: String
    var password: String

    init(username: String, school: String, password: String) {
        self.username = username
        self.school = school
        self.password = password
    }

    final class Public: Codable {
        var id: Int?
        var username: String?
        var school: String

        init(username: String, school: String) {
            self.username = username
            self.school = school
        }
    }
}

extension User: SQLiteModel {}
extension User: Migration {}
extension User: Content {}
extension User.Public: SQLiteModel {
    static let entity = User.entity
}
extension User.Public: Content {}

extension User {
    // Add Children Later
    var ownedCourses: Children<User, Course> {
        return children(\.teacherID)
    }

    var enrolledCourses: Siblings<User, Course, UserCoursePivot> {
        return siblings()
    }
}

extension User: BasicAuthenticatable {
    static let usernameKey:  UsernameKey = \User.username
    static let passwordKey: PasswordKey = \User.password
}

extension User: TokenAuthenticatable {
    typealias TokenType = Token
}

