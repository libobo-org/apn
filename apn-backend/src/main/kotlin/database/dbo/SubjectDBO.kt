package database.dbo

import database.tables.Subjects
import org.jetbrains.exposed.dao.Entity
import org.jetbrains.exposed.dao.EntityClass
import org.jetbrains.exposed.dao.id.EntityID

class SubjectDBO(var code: EntityID<String>) : Entity<String>(code) {
    var name by Subjects.name

    companion object : EntityClass<String, SubjectDBO>(Subjects)
}