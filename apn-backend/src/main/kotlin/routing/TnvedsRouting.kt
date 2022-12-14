package routing

import bo.Rights
import database.dbo.TnvedDBO
import database.tables.Tnveds
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import mapping.toDTO
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.tnvedsRouting() {
    route("tnveds") {
        get("/all") {
            val rights = call.checkAuth()
            if (!rights.contains(Rights.READ)) {
                call.respond(HttpStatusCode.Forbidden)
                return@get
            }
            val limit = call.getLimitOrThrow()
            val offset = call.getOffset()
            val tnvedsList = transaction {
                Tnveds.selectAll()
                    .limit(limit, offset = offset ?: 0)
                    .map { it.toTnvedDTO() }
            }
            call.respond(tnvedsList)
        }
        get("/{id}") {
            val rights = call.checkAuth()
            if (!rights.contains(Rights.READ)) {
                call.respond(HttpStatusCode.Forbidden)
                return@get
            }
            val id = call.parameters["id"] ?: throw BadRequestException("Incorrect tnved id")
            val tnved = transaction {
                TnvedDBO[id].toDTO()
            }
            call.respond(tnved)
        }
        get("/by_name") {
            val rights = call.checkAuth()
            if (!rights.contains(Rights.READ)) {
                call.respond(HttpStatusCode.Forbidden)
                return@get
            }
            val limit = call.getLimitOrThrow()
            val offset = call.getOffset()
            val tnvedNames = call.getTnvedNames()
            val tnvedsList = transaction {
                Tnveds.selectAll()
                    .also { query ->
                        tnvedNames.forEach { name ->
                            if (name.all { c -> c.isDigit() }) {
                                query.andWhere {
                                    Tnveds.id like "${name.uppercase()}%"
                                }
                            } else {
                                query.andWhere {
                                    Tnveds.name like "%${name.uppercase()}%"
                                }
                            }
                        }
                    }
                    .limit(limit, offset = offset ?: 0)
                    .map { it.toTnvedDTO() }
            }
            call.respond(tnvedsList)
        }
    }
}

fun ResultRow.toTnvedDTO() = TnvedDTO(
    this[Tnveds.id].value,
    this[Tnveds.name]
)

@Serializable
data class TnvedDTO(
    val code: String,
    val name: String
)