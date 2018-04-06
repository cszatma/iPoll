//
// Created by Chris Bishop on 2018-03-16.
//

import Foundation
import FluentSQLite
import Vapor

final class Quiz: Codable {
    var id: Int?
    var courseID: Course.ID
    var title: String
    var published: Bool

    init(courseID: Course.ID, title: String) {
        self.courseID = courseID
        self.title = title
        self.published = false
    }
}

extension Quiz: SQLiteModel {}
extension Quiz: Content {}
extension Quiz: Migration {}

extension Quiz {
    var course: Parent<Quiz, Course> {
        return parent(\.courseID)
    }
}