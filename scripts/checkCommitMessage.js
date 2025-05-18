const fs = require('fs')
const { execSync } = require('child_process')

// Regular expression to match commit message format
const commitMessageRegex = /^(feat|fix|chore|docs|style|refactor|test)(\([a-zA-Z0-9\-]+\))?: .+/

let commitMsg

if (process.env.CI) {
  // Running in CI, get the latest commit message
  commitMsg = execSync('git log -1 --pretty=%B').toString().trim()
} else {
  // Local environment, read the message from the file
  const commitMsgPath = process.argv[2]
  commitMsg = fs.readFileSync(commitMsgPath, 'utf8').trim()
}

if (!commitMessageRegex.test(commitMsg)) {
  console.error('❌ Invalid commit message format!')
  console.error('Please follow the format: type(scope): message')
  process.exit(1) // Exit with an error
}

console.log('✅ Commit message format is valid.')
process.exit(0)
