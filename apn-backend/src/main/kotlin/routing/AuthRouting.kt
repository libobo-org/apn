package routing

import bo.Rights
import database.dbo.UserDBO
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.exceptions.EntityNotFoundException
import org.jetbrains.exposed.sql.transactions.transaction
import org.mindrot.jbcrypt.BCrypt
import routing.token.TokenGenerator

fun Route.authRouting() {
    route("/auth") {
        post {
            val userData = call.receive<AuthRequestDTO>()
            val user = transaction {
                try {
                    UserDBO[userData.email]
                } catch (e: EntityNotFoundException) {
                    return@transaction null
                }
            } ?: run {
                call.respond(HttpStatusCode.Unauthorized, "Bad credentials")
                return@post
            }
            if (!BCrypt.checkpw(userData.password, user.password)) {
                call.respond(HttpStatusCode.Unauthorized, "Bad credentials")
            }
            val token = TokenGenerator.newToken()
            transaction {
                user.token = token
            }
            call.respond(
                AuthResponseDTO(
                    user.name,
                    token,
                    user.rights
                )
            )
        }
        post("new") {
            val rights = call.checkAuth()
            if (!rights.contains(Rights.ADMIN)) {
                call.respond(HttpStatusCode.Forbidden)
                return@post
            }
            val newUserData = call.receive<NewUserRequestDTO>()
            val userExists = transaction {
                try {
                    UserDBO[newUserData.email]
                    return@transaction true
                } catch (e: EntityNotFoundException) {
                    return@transaction false
                }
            }
            if (userExists) {
                call.respond(HttpStatusCode.Conflict, "User exists")
            }
            transaction {
                UserDBO.new(newUserData.email) {
                    this.name = newUserData.name
                    this.password = BCrypt.hashpw(newUserData.password, BCrypt.gensalt())
                    this.rights = Rights.defaultRightsListAsString()
                }
            }
            call.respond(HttpStatusCode.OK)
        }
    }
}

@Serializable
data class AuthRequestDTO(
    val email: String,
    val password: String
)

@Serializable
data class NewUserRequestDTO(
    val email: String,
    val password: String,
    val name: String
)

@Serializable
data class AuthResponseDTO(
    val name: String,
    val token: String,
    val rights: String
)