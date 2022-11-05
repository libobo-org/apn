package bo

enum class Rights(val str: String) {
    CREATE_USERS("CREATE_USERS"), READ_ONLY("READ_ONLY");

    companion object {
        fun fromString(str: String): Rights {
            return when (str) {
                CREATE_USERS.str -> CREATE_USERS
                READ_ONLY.str -> READ_ONLY
                else -> throw IllegalArgumentException("Unknown right id")
            }
        }

        fun defaultRightsList(): List<Rights> {
            return listOf(READ_ONLY)
        }

        fun defaultRightsListAsString(): String {
            return listOf(READ_ONLY).joinToString(",")
        }

        fun adminRightsListAsString(): String {
            return listOf(READ_ONLY, CREATE_USERS).joinToString(",")
        }

        fun listFromString(string: String): List<Rights> {
            return string.split(",").map {
                Rights.fromString(it)
            }
        }
    }
}