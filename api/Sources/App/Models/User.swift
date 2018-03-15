import Foundation
import FluentSQLite
import Vapor
import Authentication

final class User: Codable {
    var id: UUID?
    var username: String
    var studentNumber: Int
    var password: String

    init(username: String, studentNumber: Int, password: String) {
        self.username = username
        self.studentNumber = studentNumber
        self.password = password
    }

    final class Public: Codable {
        var id: UUID?
        var username: String
        var studentNumber: Int

        init(username: String, studentNumber: Int) {
            self.username = username
            self.studentNumber = studentNumber
        }
    }
}

extension User: SQLiteUUIDModel {}
extension User: Migration {}
extension User: Content {}
extension User.Public: SQLiteUUIDModel {
    static let entity = User.entity
}
extension User.Public: Content {}

extension User {
    // Add Children Later
    var ownedCourses: Children<User, Course> {
        return children(\.teacherID)
    }
}

extension User: BasicAuthenticatable {
    static let usernameKey:  UsernameKey = \User.username
    static let passwordKey: PasswordKey = \User.password
}

extension User: TokenAuthenticatable {
    typealias TokenType = Token
}

