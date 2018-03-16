import FluentSQLite
import Vapor
import Authentication

/// Called before your application initializes.
///
/// [Learn More →](https://docs.vapor.codes/3.0/getting-started/structure/#configureswift)
public func configure(
    _ config: inout Config,
    _ env: inout Environment,
    _ services: inout Services
) throws {
    // Register providers first
    try services.register(FluentSQLiteProvider())
    try services.register(AuthenticationProvider())



    // Register middleware
    var middlewares = MiddlewareConfig() // Create _empty_ middleware config
    middlewares.use(DateMiddleware.self) // Adds `Date` header to responses
    middlewares.use(ErrorMiddleware.self) // Catches errors and converts to HTTP response

    // Setup CORS Middleware - Allow front-end origin
    let corsConfig = CORSMiddleware.Configuration(
            allowedOrigin: .custom("http://localhost:3000"),
            allowedMethods: [.get, .post, .put, .options, .delete, .patch],
            allowedHeaders: [.accept, .authorization, .contentType, .origin, .xRequestedWith]
    )
    middlewares.use(CORSMiddleware(configuration: corsConfig)) // Allow front-end access
    services.register(middlewares)

    // Configure a SQLite database
    var databases = DatabaseConfig()
    try databases.add(database: SQLiteDatabase(storage: .memory), as: .sqlite)
    services.register(databases)

    // Configure migrations
    var migrations = MigrationConfig()
    migrations.add(model: User.self, database: .sqlite)
    migrations.add(model: Token.self, database: .sqlite)
    migrations.add(model: Course.self, database: .sqlite)
    migrations.add(model: UserCoursePivot.self, database: .sqlite)
    services.register(migrations)

    // Configure the rest of your application here

    User.Public.defaultDatabase = .sqlite

    // Register routes to the router
    let router = EngineRouter.default()
    try routes(router)
    services.register(router, as: Router.self)


}
