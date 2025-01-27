export const getProbeOptions = (probenart) => {
    const sampleTypes = ['gewebe', 'serum', 'urin'];
    if (!sampleTypes.includes(probenart)) {
      return {
        übergeordnete: [],
        untergeordnete: [],
      };
    }
  
    const uebergeordneteProbenOptions = [
      { id: 1, text: "Normal" },
      { id: 2, text: "Normal regeneriert" },
      { id: 3, text: "Normal embolisiert" },
      { id: 4, text: "Tumor" },
      { id: 5, text: "Blut" },
    ];
  
    const untergeordneteProbenOptions = {
      gewebe: [
        { id: 1, text: "keine" },
        { id: 2, text: "Paraffinblock" },
        { id: 3, text: "Paraffinblock (A/B)" },
        { id: 4, text: "Trizol" },
        { id: 5, text: "Cryo MF" },
        { id: 6, text: "Cryo SF" },
      ],
      serum: [
        { id: 1, text: "Serum prä OP" },
        { id: 2, text: "Serum intra OP peripher A" },
        { id: 3, text: "Serum intra OP peripher V" },
        { id: 4, text: "Serum intra OP ZVK" },
        { id: 5, text: "Serum intra OP LV li." },
        { id: 6, text: "Serum intra OP LV re." },
        { id: 7, text: "Serum post OP 1d." },
        { id: 8, text: "Serum post OP 2d" },
        { id: 9, text: "Serum post OP 7d" },
        { id: 10, text: "Serum post OP 14d" },
      ],
      urin: [
        { id: 1, text: "prä" },
        { id: 2, text: "intra" },
        { id: 3, text: "post 1d" },
        { id: 4, text: "post 2d" },
        { id: 5, text: "post 7d" },
        { id: 6, text: "post 14d" },
      ],
    };
  
    return {
      übergeordnete: uebergeordneteProbenOptions,
      untergeordnete: untergeordneteProbenOptions[probenart] || [],
    };
  };
  