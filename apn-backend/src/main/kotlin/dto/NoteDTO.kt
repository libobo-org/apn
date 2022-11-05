package dto

import kotlinx.serialization.Serializable

@Serializable
data class NoteDTO(
    val exportOrImport: String,
    val month: String,
    val year: String,
    val countryId: String,
    val tnved: String,
    val unitId: String? = null,
    val cost: String,
    val netto: String,
    val kol: String?,
    val federalDistrictId: String,
    val subjectId: String
)
