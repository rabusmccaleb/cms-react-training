import React, { createContext, useState, useEffect } from 'react';

export interface comicContextType {
    contentIndex : number;
    favoritesList : string;
    updateIndex : (updateType : indexUpdateType) => void;
    updateFavoritesList : (param : any) => void;
    resetIndex : () => void;
    popUpMessage : string | undefined;
    popUpMessageVal : (message : string, durration? : number) => void;
    blurViewChild : any | undefined;
    updateBlurView : (component : any) => void; 
    hideBlurView : () => void;
}

let initilizer : comicContextType = {
    contentIndex : 1,
    favoritesList : '[]',
    updateIndex : (updateType : indexUpdateType) => {},
    updateFavoritesList : (param : any) => {},
    resetIndex : () => {},
    popUpMessage : undefined,
    popUpMessageVal : (message : string, durration? : number) => {},
    blurViewChild : undefined,
    updateBlurView : (component : any) => {},
    hideBlurView : () => {},
}

export const context = createContext<comicContextType>(initilizer);

function ComicContext({children} : any) {
    // Note : contentIndex
    /**
     * [contentIndex, setContentIndex] is a useState constant, of the type number, that allows you to keep track of the current comic view index for all components that subscribe to the ComicContext.
     */
    const [contentIndex, setContentIndex] = useState<number>(1);

    // Note : favoritesList
    /**
     * [favoritesList, setFavoritesList] is a useState constant, of the type array, that allows you to keep track of the current comics added to your favorites list for all components that subscribe to the ComicContext.
     */
    const [favoritesList, setFavoritesList] = useState<any>('[]');
    // Note : updateIndex
    /**
     * updateIndex is a method to increment the the comics view up to show new not viewed comics or comics that have been previously viewed.
     * @param updateType : used to update the parameter based on rather or not you are incrementing or decrementing. *Note incrementing & decrementing only update by 1
     */
    function updateIndex(updateType : indexUpdateType) {
        if (updateType === indexUpdateType.increase) {
            setContentIndex(val => {
                return (val + 1);
            });
        }
        if (updateType === indexUpdateType.decrease && contentIndex >= 1) {
            setContentIndex((val : number) => {
                return (val - 1);
            });
        }
    }

    function resetIndex() {
        setContentIndex((val : any) => {
            return 1;
        })
    }

    // Note : setComicsState
    /**
     * @param param : this parameter is used to update the state of faviorites List it should be passing in an array
     */
    function updateFavoritesList(param : string) {
        setFavoritesList((val : any) => {
            return param;
        })
    }

    const [ popUpMessage, setPopUpMessage ] = useState<string | undefined>(undefined);
    function popUpMessageVal (message : string, durration? : number) {
        if (popUpMessage === undefined ) {
            const intervalDurration : number = durration? durration : 7000; 

            setPopUpMessage((val : string | undefined) => {
                return message;
            });

            setTimeout(() => {
                setPopUpMessage(val => {return undefined;})
            }, intervalDurration)
        }
    }

    const [ blurViewChild, setBlurViewChild ] = useState<React.FC | undefined>(undefined);
    function updateBlurView (component : React.FC) {
        setBlurViewChild((child : React.FC | undefined) => {
            return component;
        });
    }

    function hideBlurView () {
        setBlurViewChild(undefined);
    }

    const value = { 
        contentIndex,
        updateIndex,
        favoritesList,
        updateFavoritesList,
        resetIndex,
        popUpMessage,
        popUpMessageVal,
        blurViewChild,
        updateBlurView,
        hideBlurView,
    };
    return (
        <context.Provider value={value}>
                {children}
        </context.Provider>
    )
}

export enum indexUpdateType {
    increase,
    decrease
}

export enum favoritesUpdateType {
    add,
    remove
}

export default ComicContext;