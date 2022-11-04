package database.tables

import bo.ExportOrImport
import org.jetbrains.exposed.dao.id.LongIdTable

object Notes : LongIdTable() {
    val exportOrImport = enumeration<ExportOrImport>("ex_im")
    val month = integer("month")
    val year = integer("year")
    val countryId = reference("country_id", Countries).references(Countries.id)
    val tnvedId = reference("tnved_id", Tnveds).references(Tnveds.id)
    val unitId = varchar("unit_id", 5).nullable()
    val cost = decimal("cost", 20, 5)
    val netto = decimal("netto", 20, 5)
    val kol = decimal("kol", 20, 5).nullable()
    val federalDistrictId = reference("federal_district_id", FederalDistricts).references(FederalDistricts.id)
    val subjectId = reference("subject_id", Subjects).references(Subjects.id)
}