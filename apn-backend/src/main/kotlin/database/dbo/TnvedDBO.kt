package database.dbo

import database.tables.Tnveds
import org.jetbrains.exposed.dao.Entity
import org.jetbrains.exposed.dao.EntityClass
import org.jetbrains.exposed.dao.id.EntityID

class TnvedDBO(id: EntityID<String>) : Entity<String>(id) {
    var name by Tnveds.name
    var parentId by Tnveds.parentID
    var level by Tnveds.level

    companion object : EntityClass<String, TnvedDBO>(Tnveds)
}