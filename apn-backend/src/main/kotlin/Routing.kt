import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import routing.*

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

fun Application.module() {

    Database.connect(
        "jdbc:pgsql://${DatabaseMetadata.getAddress()}",
        driver = "com.impossibl.postgres.jdbc.PGDriver",
        user = DatabaseMetadata.getUser(),
        password = DatabaseMetadata.getPassword()
    )

    initRoutes()
}

private fun Application.initRoutes() {
    install(ContentNegotiation) {
        json()
    }

    routing {
        route("/hello") {
            get {
                call.respondText("WTF mazafaka works!")
            }
        }
        authRouting()
        tnvedsRouting()
        notesRouting()
        countriesRouting()
        federalDistrictsRouting()
        subjectsRouting()
    }
}