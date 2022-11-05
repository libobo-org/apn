import data_init.DataInitializer
import data_init.GispDataInitializer
import org.jetbrains.exposed.sql.Database

fun main() {

    Database.connect(
        "jdbc:pgsql://${DatabaseMetadata.getAddress()}",
        driver = "com.impossibl.postgres.jdbc.PGDriver",
        user = DatabaseMetadata.getUser(),
        password = DatabaseMetadata.getPassword()
    )

    DataInitializer.init()
    GispDataInitializer.init()
}