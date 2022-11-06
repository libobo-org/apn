package database.tables.gisp

import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IdTable
import org.jetbrains.exposed.sql.Column

object Organizations : IdTable<String>() {
    override val id: Column<EntityID<String>> = varchar("ogrn", 15).uniqueIndex().entityId()
    val name = varchar("name", 200)
    val inn = varchar("inn", 12).nullable()
    val address = varchar("address", 200).nullable()
    val titleShort = varchar("title_short", 110).nullable()
}