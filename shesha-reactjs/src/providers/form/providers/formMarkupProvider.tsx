import React, { FC, PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { IConfigurableFormComponent, IFlatComponentsStructure } from '../models';

export interface IFormFlatMarkupProviderProps {
    markup: IFlatComponentsStructure;
}

export const FormFlatMarkupContext = createContext<IFlatComponentsStructure>(undefined);

export const FormFlatMarkupProvider: FC<PropsWithChildren<IFormFlatMarkupProviderProps>> = ({ children, markup }) => {
    return (
        <FormFlatMarkupContext.Provider value={markup}>
            {children}
        </FormFlatMarkupContext.Provider>
    );
};

export const useFormMarkup = (require: boolean = true) => {
    const context = useContext(FormFlatMarkupContext);

    if (require && context === undefined) {
        throw new Error('useFormMarkup must be used within a FormFlatMarkupProvider');
    }

    return context;
};

/** Returns component model by component id  */
export const useComponentModel = (id: string): IConfigurableFormComponent => {
    const markup = useFormMarkup();

    return markup.allComponents[id];
};

export const useChildComponents = (containerId: string): IConfigurableFormComponent[] => {
    const markup = useFormMarkup();

    const result = useMemo(() => {
        const { componentRelations, allComponents } = markup;
        const childIds = componentRelations[containerId];
        if (!childIds)
            return [];
        const components = childIds.map((childId) => {
            return allComponents[childId];
        });
        return components;
    }, [markup]);

    return result;
};

export const useChildComponentIds = (containerId: string): string[] => {
    const { componentRelations } = useFormMarkup();
    const childIds = componentRelations[containerId];
    return childIds ?? [];
};


/*
getChildComponents: (id: string) => IConfigurableFormComponent[];
getChildComponentIds: (containerId: string) => string[];
*/