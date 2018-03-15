import FluentSQLite
import Vapor

final class Course: Codable {
    var id: Int?
    var courseCode: String
    var title: String
    var description: String
    var teacherID: User.ID


    init(title: String, description: String, courseCode: String, teacherID: User.ID){
        self.title = title
        self.courseCode = courseCode
        self.description = description
        self.teacherID = teacherID
    }
}

extension Course: SQLiteModel {}
extension Course: Content {}
extension Course: Migration {}

extension Course {
    var teacher: Parent<Course, User> {
        return parent(\.teacherID)
    }
}