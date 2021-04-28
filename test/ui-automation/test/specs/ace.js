/*
Copyright SecureKey Technologies Inc. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0
*/

'use strict';

describe("TrustBloc - Anonymous Comparator and Extractor (ACE)", () => {
    // runs once before the first test in this block
    before(async () => {
        await browser.reloadSession();
        await browser.maximizeWindow();
    });

    beforeEach(function () {
    });

    const currTime = new Date().getTime().toString()
    const emailID = `ui-aut-${currTime}@test.com`
    const nationalID = currTime.substring(0, 3) + "-" + currTime.substring(3, 6) + "-" + currTime.substring(6, 9)

    it('Create a UCIS account', async function () {
        this.timeout(300000);

        await browser.navigateTo(browser.config.ucisURL);

        const source = await browser.getPageSource()
        console.log("browser data = ", source)

        const showRegBtn = await $('#showRegister');
        await showRegBtn.waitForClickable();
        await showRegBtn.click();

        const nationalIDInput = await $('#nationalID');
        await nationalIDInput.waitForExist();
        await nationalIDInput.setValue(nationalID);

        const emailInput = await $('#username');
        await emailInput.waitForExist();
        await emailInput.setValue(emailID);

        const registerBtn = await $('#register');
        await registerBtn.waitForClickable();
        await registerBtn.click();

        const dashboardMsg = await $('div*=Profile Complete');
        await dashboardMsg.waitForExist();
    });

    it('Create a CBP account and Link to UCIS', async function () {
        await browser.navigateTo(browser.config.cbpURL);

        const nationalIDInput = await $('#nationalID');
        await nationalIDInput.waitForExist();
        await nationalIDInput.setValue(nationalID);

        const registerBtn = await $('#register');
        await registerBtn.waitForClickable();
        await registerBtn.click();

        const dashboardMsg = await $('div*=Application Complete!');
        await dashboardMsg.waitForExist();

        const linkBtn = await $('#linkUCIS');
        await linkBtn.waitForClickable();
        await linkBtn.click();

        let emailInput = await $('#username');
        await emailInput.waitForExist();
        await emailInput.setValue(emailID);

        const ucisLoginBtn = await $('#register');
        await ucisLoginBtn.waitForClickable();
        await ucisLoginBtn.click();

        const consentBtn = await $('#agree');
        await consentBtn.waitForClickable();
        await consentBtn.click();

        const successMsg = await $('div*=Account Linked Successfully');
        await successMsg.waitForExist();
    })

    it('Authorize Data release by UCIS Admin', async function () {
        await browser.navigateTo(browser.config.ucisInternalURL);

        const registerBtn = await $('#cb-user-0');
        await registerBtn.waitForClickable();
        await registerBtn.click();

        const releaseBtn = await $('#release');
        await releaseBtn.waitForClickable();
        await releaseBtn.click();

        const successMsg = await $('div*=Federal Benefits SSN Release Authorization');
        await successMsg.waitForExist();
    })

    it('Validate the data in Federal Settlement payroll extract', async function () {
        await browser.navigateTo(browser.config.fedSettlementURL);

        const registerBtn = await $('#view-btn-0');
        await registerBtn.waitForClickable();
        await registerBtn.click();

        const emailIDSuccess = await $('div*=' + emailID);
        await emailIDSuccess.waitForExist();

        const nationalIDSuccess = await $('div*=' + nationalID);
        await nationalIDSuccess.waitForExist();
    })
})

