package routing

import bo.Rights
import database.tables.Notes
import dto.NoteDTO
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.util.*
import io.ktor.util.*
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File
import java.util.Date

@OptIn(InternalAPI::class)
fun Route.notesRouting() {
    route("notes") {
        get {
            val rights = call.checkAuth()
            if (!rights.contains(Rights.READ)) {
                call.respond(HttpStatusCode.Forbidden)
                return@get
            }
            val limit = call.getLimitOrThrow()
            val offset = call.getOffset()
            val tnved = call.getTnved()
            val federalDistrictId = call.getFederalDistrictId()
            val subjectId = call.getSubjectId()
            val month = call.getMonth()
            val year = call.getYear()
            val exportOrImport = call.getExportOrImport()
            val countryId = call.getCountryId()
            val notesList = transaction {
                Notes.selectAll()
                    .also {
                        if (tnved != null) {
                            it.andWhere {
                                Notes.tnvedId eq tnved
                            }
                        }
                        if (federalDistrictId != null) {
                            it.andWhere {
                                Notes.federalDistrictId eq federalDistrictId
                            }
                        }
                        if (subjectId != null) {
                            it.andWhere {
                                Notes.subjectId eq subjectId
                            }
                        }
                        if (year != null) {
                            it.andWhere {
                                Notes.year eq year
                            }
                        }
                        if (month != null) {
                            it.andWhere {
                                Notes.month eq month
                            }
                        }
                        if (exportOrImport != null) {
                            it.andWhere {
                                Notes.exportOrImport eq exportOrImport
                            }
                        }
                        if (countryId != null) {
                            it.andWhere {
                                Notes.countryId eq countryId
                            }
                        }
                    }
                    .limit(limit, offset = offset ?: 0)
                    .map { it.toNoteDTO() }
            }
            call.respond(notesList)
        }
        /*post("/upload") {
            val rights = call.checkAuth()
            if (!rights.contains(Rights.READ)) {
                call.respond(HttpStatusCode.Forbidden)
                return@post
            }
            val multipartData = call.receiveMultipart()
            val contentList = mutableListOf<ByteArray>()
            val nameList = mutableListOf<String>()
            multipartData.forEachPart { part ->
                if (part is PartData.FileItem) {
                    nameList.add(part.originalFileName ?: (nameList.size.toString() + ".csv"))
                    contentList.add(part.streamProvider().readBytes())
                }
            }
            if (contentList.isEmpty()) {
                call.respondText(
                    "Files not uploaded",
                    status = HttpStatusCode.BadRequest
                )
            }
            val directory = File("uploads_${Date().toLocalDateTime()}")
            directory.mkdir()
            contentList.forEachIndexed { index, bytes ->
                val file = File(directory.path + "/" + nameList[index])
                file.createNewFile()
                file.writeBytes(bytes)
            }
            call.respond(HttpStatusCode.OK)
        }*/
    }
}

fun ResultRow.toNoteDTO() = NoteDTO(
    this[Notes.exportOrImport].string,
    this[Notes.month].toString(),
    this[Notes.year].toString(),
    this[Notes.countryId].value,
    this[Notes.tnvedId].value,
    this[Notes.unitId],
    this[Notes.cost].toString(),
    this[Notes.netto].toString(),
    this[Notes.kol]?.toString(),
    this[Notes.federalDistrictId].value,
    this[Notes.subjectId].value
)