package database.tables

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column

object Countries : IdTable<String>() {
    override val id: Column<EntityID<String>> = varchar("id", 10).uniqueIndex().entityId()
    val name = varchar("name", 100)
    val isFriendly = bool("is_friendly")
}