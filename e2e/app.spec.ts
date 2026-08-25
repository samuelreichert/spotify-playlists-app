import { expect, test } from '@playwright/test'
import { mockSpotify } from './helpers/mock-spotify'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await mockSpotify(page)
    await page.goto('/')
  })

  test('shows app heading', async ({ page }) => {
    await expect(page.getByText('Spotify playlists app')).toBeVisible()
  })

  test('fetches playlists', async ({ page }) => {
    await expect(page.locator('.accordion')).toHaveCount(3)
  })

  test('toggles dark mode', async ({ page }) => {
    await page.locator('.theme-toggle-button').click()
    await expect(page.locator('body')).toHaveClass(/dark/)
  })

  test('expands a playlist', async ({ page }) => {
    await expect(page.locator('.accordion-content')).toHaveCount(0)
    await page.locator('.accordion').first().click()
    await expect(page.locator('.accordion-content').first()).toBeVisible()
  })

  test('shows tracks after expanding', async ({ page }) => {
    await page.locator('.accordion-summary').first().click()
    await expect(page.locator('.tracks-list')).toBeVisible()
    await expect(page.locator('.track')).toHaveCount(20)
  })

  test('shows artist details', async ({ page }) => {
    await page.locator('.accordion-summary').first().click()
    await expect(page.locator('.artist')).toHaveCount(0)
    await page.locator('.track-artist').first().click()
    await expect(page.locator('.artist')).toBeVisible()
    await expect(page.locator('.artist-name')).toBeVisible()
  })

  test('closes artist details', async ({ page }) => {
    await page.locator('.accordion-summary').first().click()
    await page.locator('.track-artist').first().click()
    await expect(page.locator('.artist')).toBeVisible()
    await page.locator('.close').first().click()
    await expect(page.locator('.artist')).toHaveCount(0)
  })
})
