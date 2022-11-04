package dto

import kotlinx.serialization.Serializable

@Serializable
data class TnvedDTO(
    val id: String,
    val name: String
)