package bo

enum class ExportOrImport(val string: String) {
    EXPORT("ЭК"), IMPORT("ИМ"), BOTH("ОБ");

    companion object {
        fun fromString(str: String): ExportOrImport {
            return when (str.uppercase()) {
                "ИМ" -> IMPORT
                "ЭК" -> EXPORT
                "ОБ" -> BOTH
                else -> throw IllegalArgumentException("Unsupported import or export type: $str")
            }
        }
    }
}