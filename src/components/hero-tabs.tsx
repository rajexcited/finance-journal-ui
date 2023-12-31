import { FunctionComponent, Children, isValidElement } from "react";
import "./hero-tabs.css";
import { v4 as uuidv4 } from "uuid";


interface HeroTabHeadProps {
    children: JSX.Element;
    isActive?: boolean;
    id: string;
}
const HeroTabHead: FunctionComponent<HeroTabHeadProps> = (props) => {
    return (<>{ props.children }</>);
};
interface HeroTabContentProps {
    children: JSX.Element;
}
const HeroTabContent: FunctionComponent<HeroTabContentProps> = (props) => {
    return (<>{ props.children }</>);
};
interface HeroTabProps {
    children: JSX.Element | JSX.Element[];
    onTabSelect (tabId: string): void;
}
const HeroTab: FunctionComponent<HeroTabProps> = (props) => {
    return (<span>{ props.children }</span>);
};

interface HeroTabsProps {
    children: JSX.Element;
}

interface TabHeadType {
    id: string;
    element: JSX.Element;
    isActive?: boolean;
}

const HeroTabs: FunctionComponent<HeroTabsProps> = (props) => {
    let tabHeads: TabHeadType[] = [];
    let tabContentElement: JSX.Element | null = null;
    let onTabSelect: (tabId: string) => void;
    let activeTabHeadId: string = "";
    if (props.children.type.name === "HeroTab") {
        const heroTabProps = props.children.props as HeroTabProps;
        onTabSelect = heroTabProps.onTabSelect;
        const tabHeadElememts = Children.toArray(heroTabProps.children).filter(ch => {
            if (isValidElement(ch)) {
                const elm = ch as JSX.Element;
                return elm.type.name === "HeroTabHead";
            }
            return false;
        }) as JSX.Element[];
        tabHeads = tabHeadElememts.map(tbhd => {
            const props = tbhd.props as HeroTabHeadProps;
            if (!activeTabHeadId && props.isActive) {
                activeTabHeadId = props.id;
                return { id: props.id, element: tbhd, isActive: true };
            }
            return { id: props.id, element: tbhd };
        });
        tabContentElement = Children.toArray(heroTabProps.children).find(ch => {
            if (isValidElement(ch)) {
                const elm = ch as JSX.Element;
                return elm.type.name === "HeroTabContent";
            }
            return false;
        }) as JSX.Element;
    }

    const onClickTabHeadHandler = (tabId: string, event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.preventDefault();
        if (onTabSelect) {
            onTabSelect(tabId);
        }
    };

    return (
        <section className="hero-tabs">
            <div className="hero is-light is-small">
                <div className="hero-head">
                    <div className="tabs is-boxed">
                        <ul>
                            {
                                tabHeads.map(tbhd =>
                                    <li className={ tbhd.isActive ? "is-active" : "" }
                                        onClick={ onClickTabHeadHandler.bind(null, tbhd.id) }
                                        id={ tbhd.id + "-tabhead-li" }
                                        key={ tbhd.id + "-tabhead-key" }>
                                        <a> { tbhd.element } </a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="hero-body">
                    <div className="tabs-content-wrap">
                        <div id={ activeTabHeadId + "-tabcontent" } className="tab-content is-active">
                            { tabContentElement }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default {
    Wrapper: HeroTabs,
    Tab: HeroTab,
    TabHead: HeroTabHead,
    TabContent: HeroTabContent,
}

