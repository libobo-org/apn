package database.dbo

import database.tables.Countries
import org.jetbrains.exposed.dao.Entity
import org.jetbrains.exposed.dao.EntityClass
import org.jetbrains.exposed.dao.id.EntityID

class CountryDBO(var code: EntityID<String>) : Entity<String>(code) {
    var name by Countries.name
    var isFriendly by Countries.isFriendly

    companion object : EntityClass<String, CountryDBO>(Countries)
}