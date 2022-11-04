package dto.gisp

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class GispOrganizationDTO(
    @SerialName("gisp_url")
    val gispUrl: String? = null,
    @SerialName("prod_url")
    val prodUrl: String,
    @SerialName("org_name")
    val orgName: String,
    @SerialName("org_ogrn")
    val orgOgrn: String,
    @SerialName("org_inn")
    val orgInn: String? = null,
    @SerialName("org_addr")
    val orgAddress: String? = null
)
