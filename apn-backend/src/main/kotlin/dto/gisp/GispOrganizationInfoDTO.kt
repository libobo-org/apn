package dto.gisp

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class GispOrganizationInfoDTO(
    val adr: String? = null,
    val c: String?  = null,
    val cnt: Long? = null,
    @SerialName("listorg_id")
    val listorgId: Long? = null,
    val inn: String? = null,
    val ogrn: String,
    val wrk: String? = null,
    @SerialName("title_short")
    val titleShort: String? = null,
    @SerialName("report")
    val reports: List<Report>? = null
)

@Serializable
data class Report(
    val year: String,
    val income: Long? = null,
    val profit: Long? = null
)