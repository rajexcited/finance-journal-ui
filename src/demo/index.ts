import demoMock from "./mock";
import MockConfigType from "./services/mock-config-type";
import MockExpenses from "./services/mock-expenses";
import MockHealth from "./services/mock-health";
import MockLogin from "./services/mock-login";
import MockPaymentAccounts from "./services/mock-pymt-accounts";

MockLogin(demoMock);
MockConfigType(demoMock);
MockPaymentAccounts(demoMock);
MockHealth(demoMock);
MockExpenses(demoMock);

export default demoMock;
