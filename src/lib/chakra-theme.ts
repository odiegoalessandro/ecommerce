import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const styles = {}

const components = {}

const fonts = {
  heading: "-apple-system, system-ui, sans-serif",
  body: "system-ui, sans-serif"
}

const colors = {}

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
}

export default extendTheme({ config, styles, components, fonts, colors })