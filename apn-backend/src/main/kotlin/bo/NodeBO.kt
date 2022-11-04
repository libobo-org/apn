package bo

import java.math.BigDecimal

data class NodeBO(
    val exportOrImport: ExportOrImport,
    val month: Int,
    val year: Int,
    val countryId: String,
    val tnved: String,
    val unitId: String,
    val cost: BigDecimal,
    val netto: BigDecimal,
    val kol: BigDecimal?,
    val federalDistrictId: String,
    val subjectId: String
)
