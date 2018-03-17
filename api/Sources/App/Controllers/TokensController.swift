//
// Created by Chris Bishop on 2018-03-17.
//

import Foundation
import Vapor
import Fluent

struct TokensController: RouteCollection {
    func boot(router: Router) throws {
        let tokensRoute = router.grouped("api", "tokens")

        // Check tokens : Returns 1 or 0
        tokensRoute.get("check-token", use: checkTokenHandler)
        // Find Tokens : Returns the Token
        tokensRoute.get("find-token", use: findTokenHandler)

        // Get Tokens
        tokensRoute.get(use: getAllTokensHandler)
        tokensRoute.get(Token.parameter, use: getTokenHandler)

        // Delete Token by passing token query
        tokensRoute.delete(use:deleteToken)
    }

    // WORKS
    func getTokenHandler(_ req: Request) throws -> Future<Token> {
        return try req.parameter(Token.self)
    }

    // WORKS : ONLY FOR DEVELOPMENT
    func getAllTokensHandler(_ req: Request) throws -> Future<[Token]> {
        return Token.query(on: req).all()
    }

    // WORKS : returns 1 or 0 (true or false in JS)
    func checkTokenHandler(_ req: Request) throws -> Future<Int> {
        guard let searchTerm = req.query[String.self, at: "token"] else {
            throw Abort(.badRequest, reason: "Missing a search token in the request")
        }
        let token = Token.query(on: req).group(.or) { or in
            or.filter(\.token == searchTerm)
        }.count()

        return token
    }

    // WORKS : Returns the token
    func findTokenHandler(_ req: Request) throws -> Future<Token> {
        guard let searchTerm = req.query[String.self, at: "token"] else {
            throw Abort(.badRequest, reason: "Missing a search token in the request")
        }
        return try Token.query(on: req).filter(\Token.token == searchTerm).first().map(to: Token.self) { token in
            guard let token = token else {
                throw Abort(.notFound, reason: "Could not find Token.")
            }
            return token
        }
    }

    // Works : Delete by query of token
    func deleteToken(_ req: Request) throws -> Future<HTTPStatus> {
        guard let searchTerm = req.query[String.self, at: "token"] else {
            throw Abort(.badRequest, reason: "Missing a search token in the request")
        }
        return try Token.query(on: req).filter(\Token.token == searchTerm).first().map(to: Token.self) { token in
            guard let token = token else {
                throw Abort(.notFound, reason: "Could not find Token.")
            }
            return token
        }.delete(on: req).transform(to: .ok)
    }
}

extension Token: Parameter {}