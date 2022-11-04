package routing.token

import java.util.UUID

object TokenGenerator {

    fun newToken(): String{
        return UUID.randomUUID().toString()
    }
}