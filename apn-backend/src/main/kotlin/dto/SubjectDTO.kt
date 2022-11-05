package dto

import kotlinx.serialization.Serializable

@Serializable
data class SubjectDTO(
    val code: String,
    val name: String
)