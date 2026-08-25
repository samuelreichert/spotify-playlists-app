import type { Page } from '@playwright/test'
import { tokenFixture } from '../fixtures/token'
import { playlistFixtures } from '../fixtures/playlists'
import { buildTracksPage } from '../fixtures/tracks'
import { artistFixture } from '../fixtures/artist'

export const mockSpotify = async (page: Page) => {
  await page.addInitScript(token => {
    localStorage.setItem('spotify-access-token', token)
    localStorage.setItem('spotify-refresh-token', 'mock-refresh-token')
    localStorage.setItem(
      'spotify-expires-at',
      String(Date.now() + 60 * 60 * 1000)
    )
    localStorage.setItem(
      'spotify-scope',
      'playlist-read-private playlist-read-collaborative'
    )
  }, tokenFixture.access_token)

  await page.route('**/accounts.spotify.com/api/token', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(tokenFixture),
    })
  })

  await page.route(
    /https:\/\/api\.spotify\.com\/v1\/me\/playlists/,
    async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ items: playlistFixtures }),
      })
    }
  )

  await page.route(
    /https:\/\/api\.spotify\.com\/v1\/playlists\/[^/]+\/items/,
    async route => {
      const url = new URL(route.request().url())
      const offset = Number(url.searchParams.get('offset') ?? 0)
      const limit = Number(url.searchParams.get('limit') ?? 20)
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(buildTracksPage(offset, limit)),
      })
    }
  )

  await page.route(
    /https:\/\/api\.spotify\.com\/v1\/artists\/[^/]+/,
    async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(artistFixture),
      })
    }
  )
}
