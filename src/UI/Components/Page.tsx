import { usePageManager } from "@/Core/PageContext";
import { useEffect } from "react";

type PageProps = {
    children: React.ReactNode;
    id: string;
    onOpen?(): void;
    onClose?(): void;
};

const Page: React.FC<PageProps> = ({
    children,
}) => {

    return <>{children}</>;
}

export default Page;