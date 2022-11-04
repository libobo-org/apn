package dto.gisp

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class GispProductDTO(
    @SerialName("gisp_url")
    val gispUrl: String? = null,
    @SerialName("org_name")
    val orgName: String,
    @SerialName("org_ogrn")
    val orgOgrn: String,
    @SerialName("product_reg_number")
    val productRegNumber: String,
    @SerialName("product_writeout_url")
    val productWriteoutUrl: String,
    @SerialName("product_name")
    val productName: String,
    @SerialName("product_okpd2")
    val productOkpd2: String,
    @SerialName("product_tnved")
    val tnvedList: List<String>? = null,
    @SerialName("product_spec")
    val productSpec: String? = null,
    @SerialName("product_score_value")
    val productScoreValue: Float? = null
)
