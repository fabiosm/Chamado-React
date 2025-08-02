import { Breadcrumb, useActivePage } from "@toolpad/core";

export function customBreadcrumbs(): Breadcrumb[] {
    const activePage = useActivePage();
    if (!activePage) {
        // trate o erro, lance exceção ou retorne algo padrão
        throw new Error('activePage não está disponível');
    }

    activePage.breadcrumbs[0].title = 'Home';
    return activePage.breadcrumbs;
}