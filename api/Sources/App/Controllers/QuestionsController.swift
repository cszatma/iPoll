//
// Created by Chris Bishop on 2018-03-19.
//

import Foundation
import Vapor

struct QuestionsController: RouteCollection {
    func boot(router: Router) throws {
        let questionsRoute = router.grouped("api", "questions")

        questionsRoute.get(use: getAllHandler)
    }

    // TO BE TESTED
    func getAllHandler(_ req: Request) throws -> Future<[Question]> {
        return Question.query(on: req).all()
    }




}