package database.dbo

import database.tables.processed.TnvedData
import org.jetbrains.exposed.dao.Entity
import org.jetbrains.exposed.dao.EntityClass
import org.jetbrains.exposed.dao.id.EntityID

class TnvedDataDBO(id: EntityID<String>) : Entity<String>(id) {
    var friendlyImportData by TnvedData.friendlyImportData
    var friendlyExportData by TnvedData.friendlyExportData
    var unfriendlyImportData by TnvedData.unfriendlyImportData
    var unfriendlyExportData by TnvedData.unfriendlyExportData
    var gispData by TnvedData.gispData

    companion object : EntityClass<String, TnvedDataDBO>(TnvedData)
}