import fetch from 'node-fetch'

import core from '@actions/core'
// import github from '@actions/github'

const mealPeriods = {
  breakfast: '80000712',
  lunch: '80000717',
  dinner: '80000714',
}

const baseURL =
  'https://disneyland.disney.go.com/finder/api/v1/explorer-service/dining-availability'

const restaurants = [
  {
    name: 'Lamplight Lounge',
    id: '19013078',
    url: 'https://disneyland.disney.go.com/dining/disney-california-adventure/lamplight-lounge/',
  },
  {
    name: 'Carthay Circle Restaurant',
    id: '16515009',
    url: 'https://disneyland.disney.go.com/dining/disney-california-adventure/carthay-circle-restaurant',
  },
  {
    name: `Oga's Cantina`,
    id: '19268344',
    url: 'https://disneyland.disney.go.com/dining/disneyland/ogas-cantina',
  },
]

async function main() {
  for (const restaurant of restaurants) {
    console.log(`Fetching availability for ${restaurant.name}\n`)

    const res = await fetch(
      `${baseURL}` +
        `/${core.getInput('swid')}/dlr` +
        `/${restaurant.id}` +
        ';entityType=restaurant/table-service' +
        `/${core.getInput('party-size')}` +
        `/${core.getInput('date')}` +
        `?mealPeriod=${mealPeriods[core.getInput('meal-period')]}`,
    )

    /** @type {Object} */
    const availability = await res.json()

    console.log(
      `Availability for ${restaurant.name}: ${JSON.stringify(
        availability,
        null,
        2,
      )}\n`,
    )

    if ('offers' in availability) {
      await fetch('https://api.pushover.net/1/messages.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: core.getInput('pushover-token'),
          user: core.getInput('pushover-user'),
          priority: 1,
          title: `Dining available at ${restaurant.name}`,
          message: restaurant.url,
        }),
      })
    }
  }
}

main().catch((error) => {
  core.setFailed(error.message)
})
