package database.tables.processed

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column

object TnvedData : IdTable<String>() {
    override val id: Column<EntityID<String>> = varchar("id", 10).uniqueIndex().entityId()
    val unfriendlyImportData = text("unfriendly_import_data")
    val friendlyImportData = text("friendly_import_data")
    val unfriendlyExportData = text("unfriendly_import_data")
    val friendlyExportData = text("friendly_import_data")
    val gispData = text("gisp_data")
}