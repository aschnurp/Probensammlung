// here I will define the types which get used in the frontend in different places

// src/types/LastBoxInfo.ts

export interface LastBoxInfo {
    boxnummer: number;
    boxzeile: string;
    boxspalte: number;
}


// src/types/SuggestBoxData.ts

export interface SuggestedBoxData {
    suggestedBoxnummer: number;
    suggestedBoxzeile: string;
    suggestedBoxspalte: number;
    isNewBox: boolean;
}
