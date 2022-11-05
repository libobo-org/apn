package data_init

import database.tables.gisp.Organizations
import database.tables.gisp.Products
import database.tables.gisp.ProductsTnveds
import database.tables.gisp.Reports
import dto.gisp.GispOrganizationDTO
import dto.gisp.GispOrganizationInfoDTO
import dto.gisp.GispProductDTO
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.decodeFromStream
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.batchInsert
import org.jetbrains.exposed.sql.exists
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File
import java.math.BigDecimal

object GispDataInitializer {

    private val json = Json {
        ignoreUnknownKeys = true
    }

    @OptIn(ExperimentalSerializationApi::class)
    fun init() {
        var inputStream = File("./src/main/resources/data/gisp/gisp-organizations.json").inputStream()
        val organizationList = Json.decodeFromStream<List<GispOrganizationDTO>>(inputStream)
        inputStream.close()

        inputStream = File("./src/main/resources/data/gisp/gisp-organizations-info.json").inputStream()
        val organizationInfoMap = Json.decodeFromStream<Map<String, GispOrganizationInfoDTO>>(inputStream)
        inputStream.close()

        inputStream = File("./src/main/resources/data/gisp/gisp-products.json").inputStream()
        val productList = json.decodeFromStream<List<GispProductDTO>>(inputStream)
        inputStream.close()

        initOrganizations(organizationList, organizationInfoMap)
        initReports(organizationList, organizationInfoMap)
        initProducts(productList)
    }

    private fun initOrganizations(
        organizationList: List<GispOrganizationDTO>,
        organizationInfoMap: Map<String, GispOrganizationInfoDTO>
    ) {
        if (transaction {
                if (Organizations.exists()) {
                    return@transaction true
                } else {
                    SchemaUtils.create(Organizations)
                    return@transaction false
                }
            }
        ) return
        transaction {
            Organizations.batchInsert(organizationList) {
                this[Organizations.id] = it.orgOgrn
                this[Organizations.name] = it.orgName
                this[Organizations.inn] = it.orgInn
                this[Organizations.address] = it.orgAddress
                this[Organizations.titleShort] = organizationInfoMap[it.orgOgrn]?.titleShort
            }
        }
    }

    private fun initReports(
        organizationList: List<GispOrganizationDTO>,
        organizationInfoMap: Map<String, GispOrganizationInfoDTO>
    ) {
        if (transaction {
                if (Reports.exists()) {
                    return@transaction true
                } else {
                    SchemaUtils.create(Reports)
                    return@transaction false
                }
            }
        ) return
        val organizationMap = organizationList.associateBy { it.orgOgrn }
        val reportsList = organizationInfoMap.values.toList()
            .flatMap { info ->
                info.reports?.map { info.ogrn to it } ?: listOf()
            }.map {
                if (it.first.length > 15) {
                    val ogrn1 = it.first.split(",")[0]
                    val ogrn2 = it.first.split(",")[1]
                    val correctOgrn = if (organizationMap.containsKey(ogrn1))
                        ogrn1 else if (organizationMap.containsKey(ogrn2))
                        ogrn2 else throw IllegalArgumentException("incorrect ogrn ${it.first}")
                    correctOgrn to it.second
                } else {
                    it
                }
            }
        transaction {
            Reports.batchInsert(reportsList) {
                this[Reports.organizationOgrn] = it.first
                this[Reports.year] = it.second.year.toInt()
                this[Reports.income] = it.second.income
                this[Reports.profit] = it.second.profit
                this[Reports.outcome] = if (it.second.income == null || it.second.profit == null) {
                    null
                } else {
                    it.second.income!! - it.second.profit!!
                }
            }
        }
    }

    private fun initProducts(productList: List<GispProductDTO>) {
        if (transaction {
                if (Products.exists()) {
                    return@transaction true
                } else {
                    SchemaUtils.create(Products)
                    return@transaction false
                }
            }) return
        if (transaction {
                if (ProductsTnveds.exists()) {
                    return@transaction true
                } else {
                    SchemaUtils.create(ProductsTnveds)
                    return@transaction false
                }
            }) return
        transaction {
            productList.chunked(100000).forEach { part ->
                val productIds = Products.batchInsert(part) { product ->
                    this[Products.okpd2] = product.productOkpd2
                    this[Products.name] = product.productName.let {
                        if (it.length > 100) {
                            it.substring(0, 100)
                        } else it
                    }
                    this[Products.organizationOgrn] = product.orgOgrn
                    this[Products.regNumber] = product.productRegNumber
                    this[Products.spec] = product.productSpec.let {
                        if ((it?.length ?: 0) > 100) {
                            it?.substring(0, 100)
                        } else it
                    }
                    this[Products.scoreValue] = product.productScoreValue?.toDouble()?.let { BigDecimal.valueOf(it) }
                }
                val pairs = productIds
                    .map { it[Products.id].value }
                    .zip(
                        part.map { it.tnvedList }
                    ).map { pair ->
                        pair.second?.map {
                            pair.first to it
                        } ?: listOf()
                    }.flatten()
                ProductsTnveds.batchInsert(pairs) {
                    this[ProductsTnveds.productId] = it.first
                    this[ProductsTnveds.tnvedId] = it.second
                }
            }
        }
    }
}