package dto

import kotlinx.serialization.Serializable

@Serializable
data class FederalDistrictDTO(
    val code: String,
    val name: String
)