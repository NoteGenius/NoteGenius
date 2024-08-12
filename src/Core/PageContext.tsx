/**
 * The PageControlContext is accessable everywhere within the project
 *
 * The PageControlProvider is a wrapper component that provides the PageControlContext to its children
 * the manager controls the registry of pages and holds the navigation functions
 */

import { useRouter } from "next/navigation";
import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
    ReactNode,
    ReactElement,
    useRef,
} from "react";

// variables and functions accessable throughout the entire project
type PageControlContextType = {
    openPage(pageId: string, previousPageId: string): void;
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
export const usePageManager = (pages: ReactElement[], defaultPage: string) => {
    const [pageDictionary, setPageDictionary] = useState<{
        [key: string]: PageInstance;
    }>({});
    const router = useRouter();

    const registerPage = useCallback(
        (page: PageInstance) => {
            pageDictionary[page.id] = page;
        },
        [pageDictionary],
    );

    const openPage = useCallback(
        (pageId: string, previousPageId: string) => {
            // calling the onOpen function for the new page and pushing to that page
            const entry = pageDictionary[pageId];
            if (entry) {
                entry.onOpen && entry.onOpen();
                router!.push(`/${entry.id}`);
            }
            // calling the onClose function for the previous page
            const previousEntry = pageDictionary[previousPageId];
            if (previousEntry) previousEntry.onClose && previousEntry.onClose();
        },
        [pageDictionary, router],
    );

    useEffect(() => {
        // registering the pages
        pages.forEach((pageData) => {
            console.log(pageData);
            registerPage(pageData.props as PageInstance);
        });

        const page = pageDictionary[defaultPage];
        console.log(pageDictionary);
        // if (page.onOpen) page.onOpen();
        // router.push(defaultPage);

        // router.push(`/${(defaultPage.props as PageInstance).id}`);
    }, [registerPage, pages, pageDictionary, defaultPage]);

    return {
        openPage,
    };
};
