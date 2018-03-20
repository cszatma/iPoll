//
// Created by Chris Bishop on 2018-03-16.
//

import FluentSQLite
import Vapor

final class Course: Codable {
    var id: Int?
    var courseCode: String
    var title: String
    var description: String
    var teacherID: User.ID
    var school: String


    init(title: String, description: String, courseCode: String, teacherID: User.ID, school: String){
        self.title = title
        self.courseCode = courseCode
        self.description = description
        self.teacherID = teacherID
        self.school = school
    }
}

extension Course: SQLiteModel {}
extension Course: Content {}
extension Course: Migration {}

extension Course {
    var teacher: Parent<Course, User> {
        return parent(\.teacherID)
    }

//    var quizzes: Children<Course, Quiz> {
//        return children(\.quizID)
//    }

    var students: Siblings<Course, User, UserCoursePivot> {
        return siblings()
    }
}