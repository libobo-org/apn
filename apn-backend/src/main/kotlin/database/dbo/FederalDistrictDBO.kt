package database.dbo

import database.tables.FederalDistricts
import org.jetbrains.exposed.dao.Entity
import org.jetbrains.exposed.dao.EntityClass
import org.jetbrains.exposed.dao.id.EntityID

class FederalDistrictDBO(var code: EntityID<String>) : Entity<String>(code) {
    var name by FederalDistricts.name

    companion object : EntityClass<String, FederalDistrictDBO>(FederalDistricts)
}