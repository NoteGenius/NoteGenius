"use client"; // client hook
import { PageControlProvider, usePageManager } from "@/Core/PageContext";

export default function Home() {
    const { openPage } = usePageManager(initPages, "index");

    return <PageControlProvider openPage={openPage} />;
}

import Main from "@/app/index/page";

const initPages = [<Main key="main" pageId={"index"} />];
