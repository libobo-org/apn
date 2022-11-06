package routing

import bo.Rights
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.rightsRouting() {
    route("rights") {
        get {
            val rights = call.checkAuth()
            if (!rights.contains(Rights.ADMIN)) {
                call.respond(HttpStatusCode.Forbidden)
            }
            call.respond(Rights.values().map { it.str })
        }
    }
}