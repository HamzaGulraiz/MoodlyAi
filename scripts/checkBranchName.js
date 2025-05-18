const { execSync } = require('child_process')

const branchPattern = /^(dev|feature|fix|chore)\/[a-zA-Z0-9-_]*$/

// Get the branch name from the environment
const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

// Check if the branch name matches the pattern
if (!branchPattern.test(branchName)) {
  console.error(`❌ Invalid branch name: "${branchName}"`)
  console.error('Branch name must match the pattern: dev, feature/x, fix/x, chore/x')
  console.error('Examples: "feature/new-feature", "fix/bug-fix", "chore/update-config"')
  process.exit(1)
}

console.log(`✅ Valid branch name: "${branchName}"`)
process.exit(0)
