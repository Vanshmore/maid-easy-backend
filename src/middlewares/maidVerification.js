import puppeteer from 'puppeteer';
import { ApiError } from "../utils/ApiError.js";

const verifyPhone = async (req, res, next) => {
    const { phone } = req.body;

    if (!phone) {
        throw new ApiError(400, "Phone number is required");
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://pcs.mahaonline.gov.in/Forms/CitizenVerification.aspx');
        await page.type('#ContentPlaceHolder1_Label1', phone);
        await page.click('#ContentPlaceHolder1_btnVerify');

        await page.waitForSelector('.msgBoxContent');

        const verificationResult = await page.evaluate(() => {
            const contentDiv = document.getElementsByClassName('msgBoxContent')[0];
            const listItem = contentDiv.getElementsByTagName('li')[0];
            return listItem.innerText;
        });

        await browser.close();

        if (!verificationResult.includes('Verified')) {
            throw new ApiError(400, "Phone number verification failed");
        }

        next();

    } catch (error) {
        await browser.close();
        next(new ApiError(500, "Phone verification process encountered an error"));
    }
};

export { verifyPhone };
