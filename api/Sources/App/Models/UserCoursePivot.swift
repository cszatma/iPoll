//
// Created by Chris Bishop on 2018-03-16.
//

import Foundation
import FluentSQLite
import Vapor

final class UserCoursePivot: SQLiteUUIDPivot {
    var id: UUID?
    var userID: User.ID
    var courseID: Course.ID

    typealias Left = User
    typealias Right = Course

    static let leftIDKey: LeftIDKey = \UserCoursePivot.userID
    static let rightIDKey: RightIDKey = \UserCoursePivot.courseID

    init(_ userID: User.ID, _ courseID: Course.ID) {
        self.userID = userID
        self.courseID = courseID
    }

}

extension UserCoursePivot: Migration {}