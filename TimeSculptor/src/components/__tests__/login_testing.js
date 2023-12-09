import { Builder, By, Key } from 'selenium-webdriver'

async function loginTest () {
  // launch browser
  const driver = await new Builder().forBrowser('chrome').build()

  // get to timesculptor site
  await driver.get('http://enginick.com:9696/')

  // enter unsername and password
  await driver.findElement(By.css('#root > div > form > label:nth-child(1) > input[type=text]')).sendKeys('admin')
  await driver.findElement(By.css('#root > div > form > label:nth-child(2) > input')).sendKeys('password', Key.RETURN)

  // close the browser
  await driver.quit()
}
loginTest()
