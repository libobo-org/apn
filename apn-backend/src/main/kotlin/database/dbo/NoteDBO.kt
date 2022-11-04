package database.dbo

import database.tables.Notes
import org.jetbrains.exposed.dao.LongEntity
import org.jetbrains.exposed.dao.LongEntityClass
import org.jetbrains.exposed.dao.id.EntityID

class NoteDBO(id: EntityID<Long>) : LongEntity(id) {
    var exportOrImport by Notes.exportOrImport
    var month by Notes.month
    var year by Notes.year
    var countryId by Notes.countryId
    var tnvedId by Notes.tnvedId
    var unitId by Notes.unitId
    var cost by Notes.cost
    var netto by Notes.netto
    var kol by Notes.kol
    var federalDistrictId by Notes.federalDistrictId
    var subjectId by Notes.subjectId

    companion object : LongEntityClass<NoteDBO>(Notes)
}