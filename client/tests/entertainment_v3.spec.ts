import { test, expect } from '@playwright/test';

test('Entertainment page functional check v3', async ({ page }) => {
  await page.goto('http://localhost:5173/entertainment');

  // Check title
  await expect(page.locator('h1')).toContainText('Entertainment');

  // Check if first track is selected and displayed in "Now Playing"
  const trackTitle = await page.locator('h4').first().textContent();
  expect(trackTitle).toBeTruthy();

  // Check volume slider exists
  const volumeSlider = page.locator('input[type="range"]');
  await expect(volumeSlider).toBeVisible();
  const initialVolume = await volumeSlider.getAttribute('value');
  expect(initialVolume).toBe('0.75');

  // Play a track
  const playButton = page.locator('button.bg-white.text-black');
  await playButton.click();

  // Verify pause icon is shown
  await expect(page.locator('svg.lucide-pause').first()).toBeVisible();

  // Change volume
  await volumeSlider.fill('0.5');
  const newVolume = await volumeSlider.getAttribute('value');
  expect(newVolume).toBe('0.5');

  await page.screenshot({ path: 'entertainment_final_verification.png', fullPage: true });
});
