package database.tables.auth

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column

object Users : IdTable<String>() {
    override val id: Column<EntityID<String>> = varchar("id", 10).uniqueIndex().entityId()
    val name = varchar("name", 50)
    val password = varchar("password", 200)
    val rights = varchar("rights", 200)
    val token = varchar("token", 50).nullable()
}