package data_init

import bo.ExportOrImport
import bo.NodeBO
import database.tables.*
import dto.CountryDTO
import dto.FederalDistrictDTO
import dto.SubjectDTO
import dto.TnvedListDTO
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.decodeFromStream
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.batchInsert
import org.jetbrains.exposed.sql.exists
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File
import java.lang.Exception
import java.math.BigDecimal

@OptIn(ExperimentalSerializationApi::class)
object DataInitializer {

    private val json = Json {
        ignoreUnknownKeys = true
    }

    fun init() {
        initTnveds()
        initFederalDistricts()
        initSubjects()
        initCountries()
        initNotes()
    }

    private fun initTnveds() {
        if (transaction {
                if (Tnveds.exists()) {
                    return@transaction true
                } else {
                    SchemaUtils.create(Tnveds)
                    return@transaction false
                }
            }
        ) return

        val inputStream = File("./src/main/resources/data/tnved.json").inputStream()
        val tnvedList = json.decodeFromStream<TnvedListDTO>(inputStream)
        inputStream.close()

        println("tnveds number: ${tnvedList.list.size}")

        transaction {
            Tnveds.batchInsert(tnvedList.list.sortedBy { it.id.length }) { tnved ->
                this[Tnveds.id] = tnved.id
                this[Tnveds.level] = tnved.id.length
                this[Tnveds.name] = tnved.name
                if (tnved.id.length != 2) {
                    this[Tnveds.parentID] = tnved.id.substring(0, tnved.id.length - 2)
                }
            }
        }
    }

    private fun initFederalDistricts() {
        if (transaction {
                if (FederalDistricts.exists()) {
                    return@transaction true
                } else {
                    SchemaUtils.create(FederalDistricts)
                    return@transaction false
                }
            }
        ) return

        val inputStream = File("./src/main/resources/data/federalDistricts.json").inputStream()
        val list = json.decodeFromStream<List<FederalDistrictDTO>>(inputStream)
        inputStream.close()

        transaction {
            FederalDistricts.batchInsert(list) { district ->
                this[FederalDistricts.id] = district.code
                this[FederalDistricts.name] = district.name
            }
        }
    }

    private fun initSubjects() {
        if (transaction {
                if (Subjects.exists()) {
                    return@transaction true
                } else {
                    SchemaUtils.create(Subjects)
                    return@transaction false
                }
            }
        ) return

        val inputStream = File("./src/main/resources/data/subjects.json").inputStream()
        val list = json.decodeFromStream<List<SubjectDTO>>(inputStream)
        inputStream.close()

        transaction {
            Subjects.batchInsert(list) { subjectDTO ->
                this[Subjects.id] = subjectDTO.code
                this[Subjects.name] = subjectDTO.name.split("-", limit = 2)[1].trimStart()
            }
        }
    }

    private fun initCountries() {
        if (transaction {
                if (Countries.exists()) {
                    return@transaction true
                } else {
                    SchemaUtils.create(Countries)
                    return@transaction false
                }
            }
        ) return

        val inputStream = File("./src/main/resources/data/countries.json").inputStream()
        val list = json.decodeFromStream<List<CountryDTO>>(inputStream)
        inputStream.close()

        val euro = listOf(
            "AT",
            "BE",
            "BG",
            "HU",
            "DE",
            "GR",
            "DK",
            "IE",
            "ES",
            "IT",
            "CY",
            "LV",
            "LT",
            "LU",
            "MT",
            "NL",
            "PL",
            "PT",
            "RO",
            "SK",
            "SL",
            "FL",
            "FR",
            "HR",
            "CZ",
            "SE",
            "EE"
        )
        val unfriendlyCountries = listOf(
            "AU",
            "AL",
            "AD",
            "BS",
            "GB",
            "IS",
            "CA",
            "LI",
            "FM",
            "MC",
            "NZ",
            "NO",
            "KR",
            "SM",
            "MK",
            "SG",
            "US",
            "TW",
            "UA",
            "ME",
            "CH",
            "JP"
        ) + euro + listOf(
            "BM",
            "IO",
            "KY",
            "FK",
            "MS",
            "PN",
            "SH",
            "GS",
            "TC"
        )

        try {
            transaction {
                Countries.batchInsert(list) { countryDTO ->
                    this[Countries.id] = countryDTO.code
                    this[Countries.name] = countryDTO.name
                    this[Countries.isFriendly] =
                        !unfriendlyCountries.contains(countryDTO.code)
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun initNotes() {
        if (transaction {
                if (Notes.exists()) {
                    return@transaction true
                } else {
                    SchemaUtils.create(Notes)
                    return@transaction false
                }
            }
        ) return

        val dataset = File("./src/main/resources/data/dataset")
        val files = getAllFiles(dataset)
        parseFilesAndInsert(files)

    }

    private fun insertNodes(list: List<NodeBO>) {
        transaction {
            Notes.batchInsert(list) { node ->
                this[Notes.kol] = node.kol
                this[Notes.tnvedId] = node.tnved
                this[Notes.cost] = node.cost
                this[Notes.federalDistrictId] = node.federalDistrictId
                this[Notes.unitId] = node.unitId
                this[Notes.subjectId] = node.subjectId
                this[Notes.countryId] = node.countryId
                this[Notes.exportOrImport] = node.exportOrImport
                this[Notes.month] = node.month
                this[Notes.year] = node.year
                this[Notes.netto] = node.netto
            }
        }
    }

    private fun parseFilesAndInsert(filesList: List<File>) {
        val nodesList = mutableListOf<NodeBO>()
        filesList.forEach { file ->
            val lines = file.readLines()
            lines.subList(1, lines.size)
                .chunked(100000).forEach { listPart ->
                    nodesList.addAll(
                        listPart.map { line ->
                            val data = line.split("\t")
                            val exportOrImport = ExportOrImport.fromString(data[0])
                            val date = data[1].split("/")
                            val month = date[0].toInt()
                            val year = date[1].toInt()
                            val countryId = data[2]
                            val tnved = data[3]
                            val unit = data[4]
                            val cost = data[5].replace(',', '.').toBigDecimal()
                            val netto = data[6].replace(',', '.').toBigDecimal()
                            val kol = data[7].replace(',', '.').toBigDecimal().let {
                                if (it == BigDecimal.ZERO) null else it
                            }
                            val subject = data[8].split("-", limit = 2)
                            val subjectId = subject[0].trim()
                            val district = data[9].split("-", limit = 2)
                            val districtId = district[0].trim()
                            NodeBO(
                                exportOrImport,
                                month,
                                year,
                                countryId,
                                tnved,
                                unit,
                                cost,
                                netto,
                                kol,
                                districtId,
                                subjectId
                            )
                        }
                    )
                    insertNodes(nodesList)
                    nodesList.clear()
                    return
                }
        }
    }

    private fun getAllFiles(file: File): List<File> {
        val list = mutableListOf<File>()
        if (file.isFile) {
            if (!file.isHidden) {
                list.add(file)
            }
        } else {
            file.listFiles()?.forEach {
                list.addAll(getAllFiles(it))
            }
        }
        return list
    }
}