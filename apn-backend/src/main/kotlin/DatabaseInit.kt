import data_init.DataInitializer
import data_init.GispDataInitializer
import org.jetbrains.exposed.sql.Database

fun main() {

    Database.connect(
        "jdbc:pgsql://${DatabaseMetadata.address}",
        driver = "com.impossibl.postgres.jdbc.PGDriver",
        user = DatabaseMetadata.user,
        password = DatabaseMetadata.password
    )

    DataInitializer.init()
    GispDataInitializer.init()
}