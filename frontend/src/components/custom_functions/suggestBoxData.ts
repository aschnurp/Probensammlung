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
    console.log('response.data', response.data);

    let suggestedBoxnummer = boxnummer;
    let suggestedBoxzeile = boxzeile;
    let suggestedBoxspalte = boxspalte + 1;
    let isNewBox = false;

    // Letter sequence for boxzeile
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    // Check if spalte exceeds 9
    if (suggestedBoxspalte > 9) {
      suggestedBoxspalte = 1;

      // Move to the next letter in the sequence
      const currentIndex = letters.indexOf(suggestedBoxzeile);
      if (currentIndex >= 0 && currentIndex < letters.length - 1) {
        suggestedBoxzeile = letters[currentIndex + 1];
      } else {
        // If the currentIndex is the last letter (I) or invalid, move to a new box
        suggestedBoxzeile = 'A';
        suggestedBoxnummer += 1;
        isNewBox = true;
      }
    }

    return {
      suggestedBoxnummer,
      suggestedBoxzeile,
      suggestedBoxspalte,
      isNewBox,
    };
  } catch (error) {
    console.error('no entry was found - setting initial values');
    return {
      suggestedBoxnummer: 1,
      suggestedBoxzeile: 'A',
      suggestedBoxspalte: 1,
      isNewBox: true,
    };

  }
}

