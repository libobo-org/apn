package routing

import bo.Rights
import database.tables.FederalDistricts
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.federalDistrictsRouting() {
    route("federalDistricts") {
        get {
            val rights = call.checkAuth()
            if (!rights.contains(Rights.READ)) {
                call.respond(HttpStatusCode.Forbidden)
                return@get
            }
            val districts = transaction {
                FederalDistricts.selectAll()
                    .map { it.toFederalDistrictDTO() }
            }
            call.respond(districts)
        }
    }
}

fun ResultRow.toFederalDistrictDTO() = FederalDistrictDTO(
    this[FederalDistricts.id].value,
    this[FederalDistricts.name]
)

@Serializable
data class FederalDistrictDTO(
    val code: String,
    val name: String
)