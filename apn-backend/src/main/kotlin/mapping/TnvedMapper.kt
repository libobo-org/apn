package mapping

import database.dbo.TnvedDBO
import routing.TnvedDTO

fun TnvedDBO.toDTO() = TnvedDTO(
    this.id.value,
    this.name
)