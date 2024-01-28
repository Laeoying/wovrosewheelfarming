import { chromium } from "playwright";

const ACCOUNT = {
    "EMAIL":"email@domain.extension",
    "PASSWORD":"password" 
}

const userAgentStrings = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.2227.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.3497.92 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
];

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

try {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        userAgent: userAgentStrings[Math.floor(Math.random() * userAgentStrings.length)],
    });
    await context.addInitScript("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    const page = await context.newPage();
    await page.goto('https://www.wolvesville.com');
    console.log('Page loaded.')

    // Accept cookies
    await page.getByText('Accept all').click();
    await page.getByText('I am 16 years').click();
    await page.getByText('I have read and agree').click();
    await page.getByText('Accept').click();
    console.log('Cookies successfully accepted.');

    // Login
    await page.getByText('Sign in').click();
    await page.getByText('Sign in with email').click();
    await page.getByPlaceholder('Email').fill(ACCOUNT['EMAIL']);
    await page.getByPlaceholder('Password').fill(ACCOUNT['PASSWORD']);
    await page.getByText('LOGIN').click();
    console.log('Successfully logged in.');

    // Get values
    await page.waitForSelector('.css-1rynq56.r-1niwhzg.r-jwli3a.r-ubezar.r-1vr29t4.r-1bymd8e');
    let e = await page.$$('.css-1rynq56.r-1niwhzg.r-jwli3a.r-ubezar.r-1vr29t4.r-1bymd8e');
    let values = [];
    for (const element of e) {
        const textContent = await element.evaluate(element => element.textContent);
        values.push(textContent);
    }
    console.log('Successfully recovered values.');
    console.log('Gold : ' + values[0] + ' // Roses : ' + values[1])

    // Farming roses
    await page.getByText('INVENTORY').click();
    let auditor = false;
    let turns = 0;
    console.log('Starting farm session.')
    while (auditor == false) {
        await page.getByText(values[1]).nth(1).click();
        try {
            await page.getByText('SPIN').click({ timeout: 3000 });
            await page.getByText('Spin').nth(3).click();
            await page.getByText('').nth(1).click();
            turns += 1;
        } catch (error) {
            auditor = true;
        }
    }
    if (turns == 0) {
        console.log('Already farmed today.');
        await page.close();
    } else {
        console.log('Farming sessoin ended.');

        // Get new values
        await page.reload();
        await page.waitForSelector('.css-1rynq56.r-1niwhzg.r-jwli3a.r-ubezar.r-1vr29t4.r-1bymd8e');
        e = await page.$$('.css-1rynq56.r-1niwhzg.r-jwli3a.r-ubezar.r-1vr29t4.r-1bymd8e');
        let values2 = [];
        for (const element of e) {
            const textContent = await element.evaluate(element => element.textContent);
            values2.push(textContent);
        }
        console.log('Successfully recovered values.');
        console.log('Gold : ' + values2[0] + ' // Roses : ' + values2[1]);
        let gain = values2[0] - values[0];
        let deficit = values2[1] - values[1];
        console.log('Turns : ' + ((deficit / 30) * -1) + ' // Gain : ' + gain + ' // Deficit : ' + deficit);
        await page.close();
    }
    console.log('Script ended.');
    process.exit();
} catch (error) {
    console.log(error)
};
