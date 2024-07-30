import React, { createContext, useState, useEffect, useCallback, useContext, ReactNode, ReactElement } from 'react';
import { useRouter } from 'next/router';

type PageControlContextType = {
    defaultPage: string;
    navigateToPage(pageId: string): void;
    children?: ReactNode;
};

const PageControlContext = createContext<PageControlContextType | null>(null);

export const usePageControlContext = () => {
    const context = useContext(PageControlContext);
    if (!context) throw new Error('usePageControlContext must be used within a PageControlProvider');
    return context;
};

export const PageControlProvider: React.FC<PageControlContextType> = ({ children, ...methods }) => {
    return <PageControlContext.Provider value={methods}>{children}</PageControlContext.Provider>;
};

type PageInstance = {
    id: string;
    onOpen?: () => void;
    onClose?: () => void;
};

export const usePageManager = (pages: ReactElement[]) => {
    const [pageDictionary, setPageDictionary] = useState<{ [key: string]: PageInstance }>({});
    const [currentPage, setCurrentPage] = useState('');
    const router = useRouter();

    /** Handles adding pages to the dictionary and calling the onOpen function for the panel */
    const onPageLoad = useCallback(
        (pageId: string, callback: () => void) => {
            setPageDictionary(prev => ({
                ...prev,
                [pageId]: {
                    ...prev[pageId],
                    onOpen: callback,
                },
            }));
        },
        [setPageDictionary]
    );

    const onPageUnload = useCallback(
        (pageId: string, callback: () => void) => {
            setPageDictionary(prev => ({
                ...prev,
                [pageId]: {
                    ...prev[pageId],
                    onClose: callback,
                },
            }));
        },
        [setPageDictionary]
    );

    const registerPage = useCallback(
        (page: PageInstance) => {
            setPageDictionary(prev => ({
                ...prev,
                [page.id]: {
                    id: page.id,
                    onOpen: page.onOpen,
                    onClose: page.onClose,
                },
            }));
        },
        [setPageDictionary]
    );

    const navigateToPage = useCallback(
        (pageId: string) => {
            if (pageDictionary[pageId]) {
                router.push(pageId);
            }
        },
        [pageDictionary, router]
    );

    const {defaultPage} = usePageControlContext()

    useEffect(() => {
        pages.forEach(pageData => {
            registerPage(pageData.props as PageInstance);
        })

        // opening the default page
        if (router.pathname === '/') {
            navigateToPage(defaultPage);
        }
    }, [currentPage, pageDictionary, pages, registerPage, router.events]);

    return {
        currentPage,
        navigateToPage,
        onPageLoad,
        onPageUnload,
    };
};
