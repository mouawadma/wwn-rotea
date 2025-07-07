import { QuartzTransformerPlugin } from "../types"

export const RemoveGMSections: QuartzTransformerPlugin = () => {
  return {
    name: "RemoveGMSections",
    textTransform: (_ctx, src) => {

      const gmHeading = "GM Information"
      const lines = src.split("\n")

      const visibleLines: string[] = []
      let skip = false
      let currentHeadingDepth = -1

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const headingMatch = line.match(/^(#{1,6})\s+(.*)/)

        if (headingMatch) {
          const depth = headingMatch[1].length
          const title = headingMatch[2].trim()

          if (title === gmHeading) {
            // Begin skipping
            skip = true
            currentHeadingDepth = depth
            continue
          }

          // If we're in skip mode and this is a heading at the same or shallower level
          if (skip && depth <= currentHeadingDepth) {
            skip = false // Stop skipping
          }
        }

        if (!skip) {
          visibleLines.push(line)
        }
      }

      return visibleLines.join("\n")
    }
  }
}
