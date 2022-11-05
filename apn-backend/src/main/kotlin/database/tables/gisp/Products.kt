package database.tables.gisp

import org.jetbrains.exposed.dao.id.LongIdTable

object Products : LongIdTable() {
    val name = varchar("name", 100)
    val organizationOgrn = reference("organization_ogrn", Organizations).references(Organizations.id)
    val regNumber = varchar("reg_number", 14)
    val okpd2 = varchar("okpd2", 12)
    val spec = varchar("spec", 100).nullable()
    val scoreValue = decimal("score_value", 20, 5).nullable()

}