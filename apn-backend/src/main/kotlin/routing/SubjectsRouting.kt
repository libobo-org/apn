package routing

import bo.Rights
import database.tables.Subjects
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.subjectsRouting() {
    route("subjects") {
        get {
            val rights = call.checkAuth()
            if (!rights.contains(Rights.READ)) {
                call.respond(HttpStatusCode.Forbidden)
                return@get
            }
            val limit = call.getLimit()
            val offset = call.getOffset()
            val subjects = transaction {
                Subjects.selectAll()
                    .also { query ->
                        limit?.let {
                            query.limit(it, offset = offset ?: 0)
                        }
                    }.map { it.toSubjectDTO() }
            }
            call.respond(subjects)
        }
    }
}

fun ResultRow.toSubjectDTO() = SubjectDTO(
    this[Subjects.id].value,
    this[Subjects.name]
)

@Serializable
data class SubjectDTO(
    val code: String,
    val name: String
)