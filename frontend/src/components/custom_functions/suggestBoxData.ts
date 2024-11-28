// src/utils/suggestBoxData.ts

import { LastBoxInfo, SuggestedBoxData } from '@/src/types/otherOtypes';
import axios from 'axios';

export async function suggestBoxData(
  tableName: 'gewebeproben' | 'serumproben' | 'urinproben'
): Promise<SuggestedBoxData | null> {
  try {
    // Fetch the last box info from the backend
    const response = await axios.get<LastBoxInfo>(
      `http://localhost:8000/table/last_box_info`,
      {
        params: { table_name: tableName },
      }
    );

    const { boxnummer, boxzeile, boxspalte } = response.data;

    let suggestedBoxnummer = boxnummer;
    let suggestedBoxzeile = boxzeile;
    let suggestedBoxspalte = boxspalte + 1;
    let isNewBox = false;

    // Check if spalte exceeds 9
    if (suggestedBoxspalte > 9) {
      suggestedBoxspalte = 1;
      suggestedBoxzeile += 1;
    }

    // Check if zeile also exceeds 9
    if (suggestedBoxzeile > 9) {
      suggestedBoxzeile = 1;
      suggestedBoxspalte = 1;
      suggestedBoxnummer += 1;
      isNewBox = true;
    }

    return {
      suggestedBoxnummer,
      suggestedBoxzeile,
      suggestedBoxspalte,
      isNewBox,
    };
  } catch (error) {
    console.error('Error fetching last box info:', error);
    return null;
  }
}
