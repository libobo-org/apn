package database.tables.gisp

import database.tables.Tnveds
import org.jetbrains.exposed.dao.id.LongIdTable

object ProductsTnveds : LongIdTable() {
    val tnvedId = reference("tnved_id", Tnveds).references(Tnveds.id)
    val productId = reference("product_id", Products).references(Products.id)
}