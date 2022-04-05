import twilio from 'twilio'
import fetch from 'node-fetch'

import core from '@actions/core'
// import github from '@actions/github'

async function fetchDining() {
  const res = await fetch(
    'https://disneyland.disney.go.com/finder/api/v1/explorer-service/dining-availability/%7B75230ECE-85B6-47C2-8098-BC9B4C0E4327%7D/dlr/19013078;entityType=restaurant/table-service/3/2022-04-24/?mealPeriod=80000714',
  )

  const data = await res.json()

  console.log('data:', data)
}

async function main() {
  const fromPhoneNumber = core.getInput('from-phone-number')
  const toPhoneNumber = core.getInput('to-phone-number')

  const accountSid = core.getInput('twilio-account-sid')
  const authToken = core.getInput('twilio-auth-token')
  const client = twilio(accountSid, authToken)

  await fetchDining()

  await client.messages.create({
    body: `hi`,
    from: fromPhoneNumber,
    to: toPhoneNumber,
  })
}

main().catch((error) => {
  core.setFailed(error.message)
})
