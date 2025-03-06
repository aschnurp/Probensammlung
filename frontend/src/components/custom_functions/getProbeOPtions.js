export const getProbeOptions = (probenart) => {
  // Erlaubte Probenarten
  const sampleTypes = ['gewebe', 'serum', 'urin', 'paraffin'];
  if (!sampleTypes.includes(probenart)) {
    return {
      übergeordnete: [],
      untergeordnete: [],
      differenzierungsmerkmal: [],
      probeninformation: [],
    };
  }

  // Default-Werte
  let overgeordneteProbeOptions = [];
  let untergeordneteOptions = [];
  let differenzierungsmerkmalOptions = [];
  let probeninformationOptions = [];

  if (probenart === 'paraffin') {
    overgeordneteProbeOptions = [
      { id: 1, text: "Normal" },
      { id: 2, text: "Normal regeneriert" },
      { id: 3, text: "Normal embolisiert" },
      { id: 4, text: "Normal Empfängerleber" },
      { id: 5, text: "Normal Spender der Leber" },
      { id: 6, text: "Normal Spender nach Perfusion der Leber" },
      { id: 7, text: "Tumor" },
    ];
    untergeordneteOptions = [
      { id: 1, text: "Paraffinblock" },
      { id: 2, text: "Paraffinblock (A/B)" },
    ];
  } else if (probenart === 'serum') {
    probeninformationOptions = [
      { id: 1, probeninformation_text: "Serum prä OP I" },
      { id: 2, probeninformation_text: "Serum prä OP II" },
      { id: 3, probeninformation_text: "Serum prä OP III" },
      { id: 4, probeninformation_text: "Serum prä OP IV" },
      { id: 5, probeninformation_text: "Serum intra OP I" },
      { id: 6, probeninformation_text: "Serum intra OP II" },
    ];
  } else if (probenart === 'urin') {
    probeninformationOptions = [
      { id: 7, probeninformation_text: "Urin prä OP I" },
      { id: 8, probeninformation_text: "Urin prä OP II" },
      { id: 9, probeninformation_text: "Urin prä OP III" },
      { id: 10, probeninformation_text: "Urin prä OP IV" },
      { id: 11, probeninformation_text: "Urin intra OP I" },
      { id: 12, probeninformation_text: "Urin intra OP II" },
    ];
    differenzierungsmerkmalOptions = [
      { id: 1, text: "Katheter" },
      { id: 2, text: "Spontan" },
    ];
  } else if (probenart === 'gewebe') {
    probeninformationOptions = [
      { id: 13, probeninformation_text: "Normal Cryo I (MF)" },
      { id: 14, probeninformation_text: "Normal Cryo II (SF)" },
      { id: 15, probeninformation_text: "Normal Cryo III (SF)" },
      { id: 16, probeninformation_text: "Normal Cryo IV (SF)" },
      { id: 17, probeninformation_text: "Normal Cryo V (SF)" },
      { id: 18, probeninformation_text: "Normal Cryo VI (SF)" },
      { id: 19, probeninformation_text: "Normal Trizol" },
      { id: 20, probeninformation_text: "Tumor Cryo I (MF)" },
      { id: 21, probeninformation_text: "Tumor Cryo II (SF)" },
      { id: 22, probeninformation_text: "Tumor Cryo III (SF)" },
      { id: 23, probeninformation_text: "Tumor Cryo IV (SF)" },
      { id: 24, probeninformation_text: "Tumor Cryo V (SF)" },
      { id: 25, probeninformation_text: "Tumor Cryo VI (SF)" },
      { id: 26, probeninformation_text: "Tumor Trizol" },
    ];
    differenzierungsmerkmalOptions = [
      { id: 1, text: "Regeneriert" },
      { id: 2, text: "Embolisiert" },
      { id: 3, text: "Normal Empfänger" },
      { id: 4, text: "Spender" },
      { id: 5, text: "Spender nach Perfusion" },
    ];
  }

  return {
    übergeordnete: overgeordneteProbeOptions,
    untergeordnete: untergeordneteOptions,
    differenzierungsmerkmal: differenzierungsmerkmalOptions,
    probeninformation: probeninformationOptions,
  };
};
