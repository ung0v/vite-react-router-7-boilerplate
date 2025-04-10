const fs = require('fs')
const path = require('path')
const { transform } = require('@svgr/core')
const template = require('../svgr-template.cjs')

// Configuration
const svgDir = path.join(process.cwd(), 'src', 'assets', 'svg')
const outputDir = path.join(process.cwd(), 'src', 'components', 'icons')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Function to convert string to PascalCase
function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

// SVGR configuration
const svgrConfig = {
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  index: true,
  icon: 24,
  typescript: true,
  prettier: true,
  svgProps: {
    fill: 'currentColor',
  },

  // ID collisions with multiple SVG => Solution: https://github.com/pd4d10/vite-plugin-svgr/issues/98#issuecomment-2250076809
  svgoConfig: {
    floatPrecision: 2,
    plugins: [
      {
        name: 'convertStyleToAttrs',
      },
      {
        name: 'prefixIds',
        params: {
          prefixIds: true,
        },
      },
    ],
  },

  replaceAttrValues: {
    '#667085': 'currentColor',
  },
  template,
}

// Array to store component names for index file
const componentNames = []

// Process SVG files
fs.readdirSync(svgDir).forEach((file) => {
  if (path.extname(file) === '.svg') {
    const svgCode = fs.readFileSync(path.join(svgDir, file), 'utf8')
    const baseName = path.basename(file, '.svg')
    const componentName = `${toPascalCase(baseName)}Icon`

    componentNames.push(componentName)

    // Skip if output file already exists
    // if (fs.readdirSync(outputDir).includes(`${componentName}.tsx`)) {
    //   console.log(`▶️ Skipping ${componentName}...`);
    //   return;
    // }

    // Generate SVG component
    console.log(`⏳ Generating ${componentName}...`)
    transform(svgCode, svgrConfig, { componentName })
      .then((jsCode) => {
        const outputPath = path.join(outputDir, `${componentName}.tsx`)
        fs.writeFileSync(outputPath, jsCode)
        console.log(`✅ Generated ${outputPath}`)
      })
      .catch((error) => {
        console.error(`❌ Error processing ${file}:`, error)
      })
  }
})

// For now don't need barrer files because of causing heavy
// // Generate index file
// const indexContent = componentNames
//   .map((name) => `export { default as ${name} } from './${name}';`)
//   .join('\n')
// const indexPath = path.join(outputDir, 'index.ts')
// fs.writeFileSync(indexPath, indexContent)
// console.log(`Generated index file: ${indexPath}`)
