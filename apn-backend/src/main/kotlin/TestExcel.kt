import org.apache.poi.xssf.usermodel.XSSFWorkbook
import java.io.File

fun main() {
    val file = File("./test.xlsx")
    if (!file.exists()) {
        file.createNewFile()
    }

    val xlWb = XSSFWorkbook()
    val xlWs = xlWb.createSheet("Лист 1 мазафака")
    val row = xlWs.createRow(0)
    row.createCell(0).setCellValue("Вадик")
    row.createCell(1).setCellValue("Бэкендер")
    file.outputStream().use {
        xlWb.write(it)
        xlWb.close()
    }
}