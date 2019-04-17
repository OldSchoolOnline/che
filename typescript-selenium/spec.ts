/*********************************************************************
 * Copyright (c) 2018 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { e2eContainer } from "./inversify.config";
import { Driver } from "./driver/Driver";
import { TYPES, CLASSES } from "./types";
import { DriverHelper } from "./utils/DriverHelper";
import { By, WebElementCondition, Condition } from "selenium-webdriver";
import { describe, after } from "mocha";
import { LoginPage } from "./pageobjects/login/LoginPage";
import { Dashboard } from "./pageobjects/dashboard/Dashboard";
import { expect, assert } from 'chai'
import { Workspaces } from "./pageobjects/dashboard/Workspaces";
import { NameGenerator } from "./utils/NameGenerator";
import { NewWorkspace } from "./pageobjects/dashboard/NewWorkspace";
import { WorkspaceDetails } from "./pageobjects/dashboard/workspace-details/WorkspaceDetails";
import { WorkspaceDetailsPlugins } from "./pageobjects/dashboard/workspace-details/WorkspaceDetailsPlugins";
import { Request, post, get } from "selenium-webdriver/http";
import { TestWorkspaceUtil } from "./utils/workspace/TestWorkspaceUtil";
import { Ide } from "./pageobjects/ide/Ide";

const workspaceName: string = NameGenerator.generate("wksp-test-", 5);
const namespace: string = "che";
const sampleName: string = "console-java-simple";

const driver: Driver = e2eContainer.get<Driver>(TYPES.Driver);
const driverHelper: DriverHelper = e2eContainer.get(CLASSES.DriverHelper);
const loginPage: LoginPage = e2eContainer.get<LoginPage>(TYPES.LoginPage);
const dashboard: Dashboard = e2eContainer.get(CLASSES.Dashboard);
const workspaces: Workspaces = e2eContainer.get(CLASSES.Workspaces);
const newWorkspace: NewWorkspace = e2eContainer.get(CLASSES.NewWorkspace);
const workspaceDetails: WorkspaceDetails = e2eContainer.get(CLASSES.WorkspaceDetails);
const workspaceDetailsPlugins: WorkspaceDetailsPlugins = e2eContainer.get(CLASSES.WorkspaceDetailsPlugins)
const testWorkspaceUtil: TestWorkspaceUtil = e2eContainer.get(CLASSES.TestWorkspaceUtil)
const ide: Ide = e2eContainer.get(CLASSES.Ide)




suite("E2E", async () => {

    suite("Login and wait dashboard", async () => {
        test("login", async () => {
            await loginPage.login()
        })

        test("wait dashboard", async () => {
            await dashboard.waitLoader()
            await dashboard.waitLoaderDisappearance()
            await dashboard.waitPage()
        })
    })

    suite("Create workspace and open IDE", async () => {

        test("Go to 'New Workspace' page", async () => {
            await dashboard.clickWorkspacesButton()
            await workspaces.clickAddWorkspaceButton()
        })

        test(`Create a '${workspaceName}' workspace`, async () => {
            await newWorkspace.typeWorkspaceName(workspaceName)
            await newWorkspace.clickOnChe7Stack()
            await newWorkspace.waitChe7StackSelected()
            await newWorkspace.clickOnAddOrImportProjectButton()
            await newWorkspace.enableSampleCheckbox(sampleName)
            await newWorkspace.clickOnAddButton()
            await newWorkspace.waitProjectAdding(sampleName)

            await newWorkspace.clickOnCreateAndOpenButton()
        })

        // test("Add 'Java Language Support' plugin to workspace", async () => {
        //     const javaPluginName: string = "Language Support for Java(TM)";
        //     const execPlugin: string = "Che machine-exec Service";

        //     await workspaceDetails.waitPage(workspaceName);
        //     await workspaceDetails.waitTabSelected('Overview')
        //     await workspaceDetails.clickOnTab('Plugins')
        //     await workspaceDetails.waitTabSelected('Plugins')


        //     await workspaceDetailsPlugins.waitPluginEnabling(execPlugin)
        //     await workspaceDetailsPlugins.waitPluginDisabling(javaPluginName)
        //     await workspaceDetailsPlugins.clickOnPluginListItemSwitcher(javaPluginName)
        //     await workspaceDetailsPlugins.waitPluginEnabling(javaPluginName)

        //     await workspaceDetails.waitSaveButton()
        //     await workspaceDetails.clickOnSaveButton()
        //     await workspaceDetails.waitSaveButtonDisappearance()

        //     await workspaceDetails.clickOnOpenButton()
        // })

        test("Wait IDE availability", async () => {
            await ide.waitAndSwitchToIdeFrame()
            await ide.waitWorkspaceAndIde(namespace, workspaceName);
        })




    })



})

// suiteTeardown("close browser", async () => {
//     driver.get().quit()
// })






