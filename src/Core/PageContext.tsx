/**
 * The PageControlContext is accessable everywhere within the project
 *
 * The PageControlProvider is a wrapper component that provides the PageControlContext to its children
 * the manager controls the registry of pages and holds the navigation functions
 */

import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
    ReactNode,
    ReactElement,
} from "react";
import { useRouter } from "next/router";

// variables and functions accessable throughout the entire project
type PageControlContextType = {
    defaultPage: string;
    openPage(pageId: string): void;
    children?: ReactNode;
};

const PageControlContext = createContext<PageControlContextType | null>(null);

// custom hook to access the PageControlContext within the project
export const usePageControlContext = () => {
    const context = useContext(PageControlContext);
    if (!context)
        throw new Error(
            "usePageControlContext must be used within a PageControlProvider",
        );
    return context;
};

// the PageControlProvider component that wraps the entire project
export const PageControlProvider: React.FC<PageControlContextType> = ({
    children,
    ...methods
}) => {
    return (
        <PageControlContext.Provider value={methods}>
            {children}
        </PageControlContext.Provider>
    );
};

// structure of page data they are stored as in the page manager's registry'
type PageInstance = {
    id: string;
    onOpen?: () => void;
    onClose?: () => void;
};

// custom hook to manage the pages and navigation
export const usePageManager = (pages: ReactElement[]) => {
    const [pageDictionary, setPageDictionary] = useState<{
        [key: string]: PageInstance;
    }>({});
    const router = useRouter();

    const registerPage = useCallback(
        (page: PageInstance) => {
            setPageDictionary((prev) => ({
                ...prev,
                [page.id]: {
                    id: page.id,
                    onOpen: page.onOpen,
                    onClose: page.onClose,
                },
            }));
        },
        [setPageDictionary],
    );

    const openPage = useCallback(
        (pageId: string, previousPageId?: string) => {
            const entry = pageDictionary[pageId];
            if (entry) {
                entry.onOpen && entry.onOpen();
                router.push(pageId);
            }
        },
        [pageDictionary, router],
    );

    const { defaultPage } = usePageControlContext();

    useEffect(() => {
        pages.forEach((pageData) => {
            registerPage(pageData.props as PageInstance);
        });

        // opening the default page
        if (router.pathname === "/") {
            openPage(defaultPage);
        }
    }, [defaultPage, openPage, pages, registerPage, router.pathname]);

    return {
        openPage,
    };
};
