import { useState } from "react"
import { HexColorPicker } from "react-colorful"

export function Dashboard() {
  const [color, setColor] = useState("#FFFFFF")
  return (
    <div>
      <HexColorPicker
        color={color}
        onChange={setColor}
      />
      <h1>Hello, dashboard!</h1>
    </div>
  )
}
