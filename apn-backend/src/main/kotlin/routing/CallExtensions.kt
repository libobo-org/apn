package routing

import bo.ExportOrImport
import io.ktor.server.application.*
import io.ktor.server.plugins.*

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