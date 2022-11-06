object DatabaseMetadata {

    private const val userKey = "DB_USER"
    private const val passwordKey = "DB_PASSWORD"

    /*fun getAddress(): String {
        return address
    }

    fun getUser(): String {
        return user
    }

    fun getPassword(): String {
        return password
    }*/

    fun getAddress(): String {
        return System.getenv("DB_HOST") + ":" +
                System.getenv("DB_PORT") + "/" +
                System.getenv("DB_DATABASE")
    }

    fun getUser(): String {
        return System.getenv(userKey)
    }

    fun getPassword(): String {
        return System.getenv(passwordKey)
    }
}
