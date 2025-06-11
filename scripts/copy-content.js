#!/usr/bin/env node

import fs from "fs"
import path from "path"

function copyDirectory(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true })
  }

  // Read all files and directories in the source
  const entries = fs.readdirSync(source, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name)
    const destinationPath = path.join(destination, entry.name)

    if (entry.isDirectory()) {
      // Recursively copy directories
      copyDirectory(sourcePath, destinationPath)
    } else {
      // Copy files
      fs.copyFileSync(sourcePath, destinationPath)
    }
  }
}

// Main execution
try {
  const contentSource = "content"
  const contentDestination = "public/content"

  console.log("📁 Copying content for deployment...")
  copyDirectory(contentSource, contentDestination)
  console.log("✅ Content copied successfully!")
} catch (error) {
  console.log("⚠️  Content copy failed, continuing build:", error.message)
  // Don't exit with error to allow build to continue
}
