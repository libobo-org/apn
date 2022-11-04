package routing

import database.tables.Countries
import dto.CountryDTO
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.countriesRouting() {
    route("countries") {
        get {
            val limit = call.getLimitOrThrow()
            val offset = call.getOffset()
            val countries = transaction {
                Countries.selectAll()
                    .limit(limit, offset = offset ?: 0)
                    .map { it.toCountryDTO() }
            }
            call.respond(countries)
        }
    }
}

fun ResultRow.toCountryDTO() = CountryDTO(
    this[Countries.id].value,
    this[Countries.name]
)