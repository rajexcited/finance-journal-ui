import { FunctionComponent, useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { PAGE_URL } from "../../root";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faGear, faMoneyBills, faTags, faUserAlt, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { HeroTabs } from "../../../components";


const SettingsRootPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const TAB_HEADS = [
        { id: "root-stngs", title: "General Settings", url: PAGE_URL.settingsRoot.fullUrl, icon: faGear },
        { id: "xpns-ctgry-stngs", title: "Expense Category", url: PAGE_URL.expenseCategorySettings.fullUrl, icon: faCoins },
        { id: "pymt-acc-typ-stngs", title: "Payment Account Type", url: PAGE_URL.pymtAccountTypeSettings.fullUrl, icon: faMoneyBills },
        // { id: "tags-stngs", title: "Tags", url: PAGE_URL.tagsSettings.fullUrl, icon: faTags },
        { id: "profile-stngs", title: "Profile", url: PAGE_URL.profileSettings.fullUrl, icon: faUserAlt },
        { id: "scrty-stngs", title: "Security", url: PAGE_URL.securitySettings.fullUrl, icon: faUserSecret },
    ];
    const [activeTabId, setActiveTabId] = useState("");

    useEffect(() => {
        const tabhed = TAB_HEADS.find(tbhd => window.location.pathname === tbhd.url);
        setActiveTabId(tabhed && tabhed.id || TAB_HEADS[0].id);
    }, [location.pathname]);

    const onTabSelectHandler = (tabId: string) => {
        const tabHeadSelected = TAB_HEADS.find(thd => thd.id === tabId);
        if (tabHeadSelected) {
            navigate(tabHeadSelected.url);
        } else {
            console.error("tab head not found, tabId", tabId);
        }
    };

    const tabChildren = TAB_HEADS.map(tbhd =>
        <HeroTabs.TabHead id={ tbhd.id } isActive={ tbhd.id === activeTabId } key={ tbhd.id } >
            <span className="icon-text">
                <span className="icon">
                    <FontAwesomeIcon icon={ tbhd.icon } />
                </span>
                <span>{ tbhd.title }</span>
            </span>
        </HeroTabs.TabHead>
    );

    tabChildren.push(
        <HeroTabs.TabContent key={ "tabcontentstngs" }>
            <Outlet />
        </HeroTabs.TabContent>
    );

    return (
        <HeroTabs.Wrapper>
            <HeroTabs.Tab onTabSelect={ onTabSelectHandler }>
                { tabChildren }
            </HeroTabs.Tab>
        </HeroTabs.Wrapper>
    );
};

export default SettingsRootPage;