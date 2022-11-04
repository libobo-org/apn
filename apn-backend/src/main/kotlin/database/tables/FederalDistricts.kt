package database.tables

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column

object FederalDistricts : IdTable<String>() {
    override val id: Column<EntityID<String>> = varchar("id", 10).uniqueIndex().entityId()
    val name = varchar("name", 100)
}