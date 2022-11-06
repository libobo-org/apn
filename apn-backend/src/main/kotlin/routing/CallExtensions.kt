package routing

import bo.ExportOrImport
import bo.Rights
import database.tables.auth.Users
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

fun ApplicationCall.getOffset(): Long? {
    val offsetStr = this.request.queryParameters["offset"]
    var offset: Long? = null
    if (!offsetStr.isNullOrEmpty()) {
        offset = offsetStr.toLongOrNull() ?: throw BadRequestException("Incorrect offset")
    }
    return offset
}

fun ApplicationCall.getLimitOrThrow(): Int {
    return this.request.queryParameters["limit"]?.toIntOrNull() ?: throw BadRequestException("Incorrect limit")
}

fun ApplicationCall.getLimit(): Int? {
    return this.request.queryParameters["limit"]?.toIntOrNull()
}

fun ApplicationCall.getTnved(): String? {
    return this.request.queryParameters["tnved"]
}

fun ApplicationCall.getTnvedNames(): List<String> {
    this.request.queryParameters["tnved_name"]
        ?.split(" ")
        ?.filter { it.isNotEmpty() }.let {
            if (it.isNullOrEmpty()) {
                throw BadRequestException("Incorrect tnved_name")
            }
            return it
        }
}

fun ApplicationCall.getFederalDistrictId(): String? {
    return this.request.queryParameters["federalDistrictId"]
}

fun ApplicationCall.getCountryId(): String? {
    return this.request.queryParameters["countryId"]
}

fun ApplicationCall.getSubjectId(): String? {
    return this.request.queryParameters["subjectId"]
}

fun ApplicationCall.getMonth(): Int? {
    val monthStr = this.request.queryParameters["month"]
    var month: Int? = null
    if (!monthStr.isNullOrEmpty()) {
        month = monthStr.toIntOrNull() ?: throw BadRequestException("Incorrect month")
    }
    return month
}

fun ApplicationCall.getYear(): Int? {
    val yearStr = this.request.queryParameters["year"]
    var year: Int? = null
    if (!yearStr.isNullOrEmpty()) {
        year = yearStr.toIntOrNull() ?: throw BadRequestException("Incorrect year")
    }
    return year
}

fun ApplicationCall.getExportOrImport(): ExportOrImport? {
    val exOrImStr = this.request.queryParameters["exOrIm"]
    var exOrIm: ExportOrImport? = null
    if (!exOrImStr.isNullOrEmpty()) {
        exOrIm = try {
            ExportOrImport.fromString(exOrImStr)
        } catch (e: IllegalArgumentException) {
            throw BadRequestException("Incorrect exOrIm")
        }
    }
    return exOrIm
}

suspend fun ApplicationCall.checkAuth(): List<Rights> {
    val token = this.request.header("Authorization") ?: run {
        this.respond(HttpStatusCode.Unauthorized, "Bad credentials")
        return emptyList()
    }
    val rights = transaction {
        Users.select {
            Users.token eq token
        }.map {
            it[Users.rights]
        }.map {
            Rights.listFromString(it)
        }
    }.firstOrNull() ?: run {
        this.respond(HttpStatusCode(418, "Как ты сюда вообще попал?"))
        return emptyList()
    }
    return rights
}