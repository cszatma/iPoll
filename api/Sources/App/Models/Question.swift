//
// Created by Chris Bishop on 2018-03-19.
//

import Foundation
import FluentSQLite
import Vapor

final class Question: Codable {
    var id: Int?
    var quizID: Quiz.ID
    var question: String
    var optionA: String
    var optionB: String
    var optionC: String
    var optionD: String
    var answer: String
    var weight: Int

    init(quizID: Quiz.ID, question: String, optionA: String, optionB: String, optionC: String, optionD: String, answer: String, weight: Int) {
        self.quizID = quizID
        self.question = question
        self.optionA = optionA
        self.optionB = optionB
        self.optionC = optionC
        self.optionD = optionD
        self.answer = answer
        self.weight = weight
    }
}

extension Question: SQLiteModel {}
extension Question: Content {}
extension Question: Migration {}

extension Question {
    var quiz: Parent<Question, Quiz> {
        return parent(\.quizID)
    }
}