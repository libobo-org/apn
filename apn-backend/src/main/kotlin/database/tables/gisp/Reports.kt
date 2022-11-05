package database.tables.gisp

import org.jetbrains.exposed.dao.id.LongIdTable

object Reports : LongIdTable() {
    val year = integer("year")
    val income = long("income").nullable()
    val profit = long("profit").nullable()
    val outcome = long("outcome").nullable()
    val organizationOgrn = reference("organization_ogrn", Organizations).references(Organizations.id)
}