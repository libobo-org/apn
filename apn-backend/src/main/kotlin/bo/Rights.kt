package bo

enum class Rights(val str: String) {
    ADMIN("ADMIN"), READ("READ");

    companion object {
        fun fromString(str: String): Rights {
            return when (str) {
                ADMIN.str -> ADMIN
                READ.str -> READ
                else -> throw IllegalArgumentException("Unknown right id")
            }
        }

        fun defaultRightsList(): List<Rights> {
            return listOf(READ)
        }

        fun defaultRightsListAsString(): String {
            return listOf(READ).joinToString(",")
        }

        fun adminRightsListAsString(): String {
            return listOf(READ, ADMIN).joinToString(",")
        }

        fun listFromString(string: String): List<Rights> {
            return string.split(",").map {
                Rights.fromString(it)
            }
        }
    }
}