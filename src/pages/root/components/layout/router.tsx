import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./root";
import ErrorPage from "./error";
import { PAGE_URL } from "../navigation";
import {
    PymtAccountList,
    PymtAccountsRoot,
    AddPymtAccount,
    UpdatePymtAccount,
    pymtAccountActionHandler,
    pymtAccountDetailLoaderHandler,
    pymtAccountListLoaderHandler
} from '../../../pymt-accounts';
import { AddExpense, ExpenseJournalPage, ExpenseList, UpdateExpense, expenseListLoaderHandler, expenseActionHandler, expenseDetailLoaderHandler, expenseDetailSupportingLoaderHandler } from '../../../expenses';
import { ExpenseCategoryPage, PymtAccountTypePage, SettingsRoot } from "../../../settings";
import { LoginPage, RequireAuth, SignupPage, LogoutPage } from "../../../auth";
import HomePage from "./home";
import { pymtAccountDetailSupportingLoaderHandler } from "../../../pymt-accounts/route-handlers/account-loader";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: PAGE_URL.loginPage.shortUrl, element: <LoginPage /> },
            { path: PAGE_URL.signupPage.shortUrl, element: <SignupPage /> },
            { path: PAGE_URL.logoutPage.shortUrl, element: <LogoutPage /> },
            {
                path: PAGE_URL.expenseJournalRoot.shortUrl,
                element: <RequireAuth><ExpenseJournalPage /></RequireAuth>,
                action: expenseActionHandler,
                children: [
                    { index: true, element: <ExpenseList />, loader: expenseListLoaderHandler, },
                    { path: PAGE_URL.addExpense.shortUrl, element: <AddExpense />, loader: expenseDetailSupportingLoaderHandler, action: expenseActionHandler },
                    { path: PAGE_URL.updateExpense.shortUrl, element: <UpdateExpense />, loader: expenseDetailLoaderHandler, action: expenseActionHandler },
                ]
            },
            {
                path: PAGE_URL.pymtAccountsRoot.shortUrl,
                element: <RequireAuth><PymtAccountsRoot /></RequireAuth>,
                action: pymtAccountActionHandler,
                children: [
                    { index: true, element: <PymtAccountList />, loader: pymtAccountListLoaderHandler, },
                    { path: PAGE_URL.addPymAccount.shortUrl, element: <AddPymtAccount />, loader: pymtAccountDetailSupportingLoaderHandler, action: pymtAccountActionHandler },
                    { path: PAGE_URL.updatePymAccount.shortUrl, element: <UpdatePymtAccount />, loader: pymtAccountDetailLoaderHandler, action: pymtAccountActionHandler, },
                ]
            },
            {
                path: PAGE_URL.settingsRoot.shortUrl,
                element: <RequireAuth><SettingsRoot /></RequireAuth>,
                children: [
                    { index: true, element: <div>Settings Home</div> },
                    { path: PAGE_URL.expenseCategorySettings.shortUrl, element: <ExpenseCategoryPage /> },
                    { path: PAGE_URL.pymtAccountTypeSettings.shortUrl, element: <PymtAccountTypePage /> },
                    { path: PAGE_URL.tagsSettings.shortUrl, element: <div> tags settings </div> },
                    { path: PAGE_URL.profileSettings.shortUrl, element: <div> Profile settings </div> },
                ]
            }
        ]
    },
]);