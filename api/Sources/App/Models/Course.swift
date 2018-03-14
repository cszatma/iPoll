import FluentSQLite
import Vapor

final class Course: Codable {
    var id: Int?
    var courseCode: String
    var title: String
    var description: String

    init(title: String, description: String, courseCode: String){
        self.title = title
        self.courseCode = courseCode
        self.description = description
    }
}

extension Course: SQLiteModel {}
extension Course: Content {}
extension Course: Migration {}

extension Course {

}