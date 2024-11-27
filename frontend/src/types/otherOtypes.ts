// here I will define the types which get used in the frontend in different places

// src/types/LastBoxInfo.ts

export interface LastBoxInfo {
    boxnummer: number;
    boxzeile: number;
    boxspalte: number;
}


// src/types/SuggestBoxData.ts

export interface SuggestedBoxData {
    suggestedBoxnummer: number;
    suggestedBoxzeile: number;
    suggestedBoxspalte: number;
    isNewBox: boolean;
}
