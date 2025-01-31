import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function WikiAPI() {
  return (
    <div>
      <SwaggerUI url={`${import.meta.env.VITE_API_HOST}/api-json`} />
    </div>
  )
}