export const getProbeOptions = (probenart) => {
    const sampleTypes = ['gewebe', 'serum', 'urin', 'paraffin'];
    if (!sampleTypes.includes(probenart)) {
      return {
        übergeordnete: [],
        untergeordnete: [],
      };
    }
  
    const uebergeordneteProbenOptions = {
      gewebe: [
      { id: 1, text: "Normal" },
      { id: 2, text: "Normal regeneriert" },
      { id: 3, text: "Normal embolisiert" },
      { id: 4, text: "Normal Empfängerleber" },
      { id: 5, text: "Normal Spender der Leber" },
      { id: 6, text: "Normal Spender nach Perfusion der Leber" },
      { id: 7, text: "Tumor" },
    ],
    urin: [
      { id: 1, text: "Katheter" },
      { id: 2, text: "Spontan" },
    ],
    paraffin: [
      { id: 1, text: "Normal" },
      { id: 2, text: "Normal regeneriert" },
      { id: 3, text: "Normal embolisiert" },
      { id: 4, text: "Normal Empfängerleber" },
      { id: 5, text: "Normal Spender der Leber" },
      { id: 6, text: "Normal Spender nach Perfusion der Leber" },
      { id: 7, text: "Tumor" },
    ],
    };
    const untergeordneteProbenOptions = {
      gewebe: [
        { id: 1, text: "keine" },
        { id: 2, text: "Trizol" },
        { id: 3, text: "Cryo MF" },
        { id: 4, text: "Cryo SF" },
      ],
      serum: [
        { id: 1, text: "Serum prä OP" },
        { id: 2, text: "Serum intra OP peripher A" },
        { id: 3, text: "Serum intra OP peripher V" },
        { id: 4, text: "Serum intra OP ZVK" },
        { id: 5, text: "Serum intra OP LV li." },
        { id: 6, text: "Serum intra OP LV re." },
        { id: 7, text: "Serum post OP 1d" },
        { id: 8, text: "Serum post OP 2d" },
        { id: 9, text: "Serum post OP 7d" },
        { id: 10, text: "Serum post OP 14d" },
      ],
      urin: [
        { id: 1, text: "prä OP" },
        { id: 2, text: "intra OP" },
        { id: 3, text: "post OP 1d" },
        { id: 4, text: "post OP 2d" },
        { id: 5, text: "post OP 7d" },
        { id: 6, text: "post OP 14d" },
      ],
      paraffin: [
        { id: 1, text: "Paraffinblock" },
        { id: 2, text: "Paraffinblock (A/B)" },
      ],
    };
  
    return {
      übergeordnete: uebergeordneteProbenOptions[probenart] || [],
      untergeordnete: untergeordneteProbenOptions[probenart] || [],
    };
  };
  