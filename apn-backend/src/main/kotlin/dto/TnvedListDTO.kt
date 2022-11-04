package dto

import kotlinx.serialization.Serializable

@Serializable
data class TnvedListDTO(
    val list: List<TnvedDTO>
)