package database.dbo

import database.tables.auth.Users
import org.jetbrains.exposed.dao.Entity
import org.jetbrains.exposed.dao.EntityClass
import org.jetbrains.exposed.dao.id.EntityID

class UserDBO(email: EntityID<String>) : Entity<String>(email){
    var name by Users.name
    var password by Users.password
    var rights by Users.rights
    var token by Users.token

    companion object : EntityClass<String, UserDBO>(Users)
}