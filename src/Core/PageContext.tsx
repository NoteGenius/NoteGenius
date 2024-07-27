import React, { createContext, useState, useEffect, useCallback, useContext, ReactNode, ReactElement } from 'react';
import { useRouter } from 'next/router';

type PageControlContextType = {
    currentPage: string;
    previousPage: string;
    onPageLoad: (pageId: string, callback: () => void) => void;
    onPageUnload: (pageId: string, callback: () => void) => void;
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
    onLoad?: () => void;
    onUnload?: () => void;
};

export const usePageManager = () => {
    const [pageDictionary, setPageDictionary] = useState<{ [key: string]: PageInstance }>({});
    const [currentPage, setCurrentPage] = useState('');
    const [previousPage, setPreviousPage] = useState('');
    const router = useRouter();

    const onPageLoad = useCallback(
        (pageId: string, callback: () => void) => {
            setPageDictionary(prev => ({
                ...prev,
                [pageId]: {
                    ...prev[pageId],
                    onLoad: callback,
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
                    onUnload: callback,
                },
            }));
        },
        [setPageDictionary]
    );

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            setPreviousPage(currentPage);
            setCurrentPage(url);
            if (pageDictionary[url] && pageDictionary[url].onLoad) {
                pageDictionary[url].onLoad();
            }
            if (pageDictionary[currentPage] && pageDictionary[currentPage].onUnload) {
                pageDictionary[currentPage].onUnload();
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [currentPage, pageDictionary, router.events]);

    return {
        currentPage,
        previousPage,
        onPageLoad,
        onPageUnload,
    };
};
