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
    probeninformationOptions = Array.from({ length: 42 }, (_, i) => ({
      id: i + 1,
      probeninformation_text: [
        'Serum prä OP I', 'Serum prä OP II', 'Serum prä OP III', 'Serum prä OP IV',
        'Serum intra OP I', 'Serum intra OP II', 'Serum intra OP III', 'Serum intra OP IV',
        'Serum post OP 1d I', 'Serum post OP 1d II', 'Serum post OP 1d III', 'Serum post OP 1d IV',
        'Serum post OP 2d I', 'Serum post OP 2d II', 'Serum post OP 2d III', 'Serum post OP 2d IV',
        'Serum post OP 7d I', 'Serum post OP 7d II', 'Serum post OP 7d III', 'Serum post OP 7d IV',
        'Serum post OP 14d I', 'Serum post OP 14d II', 'Serum post OP 14d III', 'Serum post OP 14d IV'
      ][i]
    }));
  } else if (probenart === 'urin') {
    probeninformationOptions = Array.from({ length: 24 }, (_, i) => ({
      id: i + 5,
      probeninformation_text: [
        'Urin prä OP I', 'Urin prä OP II', 'Urin prä OP III', 'Urin prä OP IV',
        'Urin intra OP I', 'Urin intra OP II', 'Urin intra OP III', 'Urin intra OP IV',
        'Urin post OP 1d I', 'Urin post OP 1d II', 'Urin post OP 1d III', 'Urin post OP 1d IV',
        'Urin post OP 2d I', 'Urin post OP 2d II', 'Urin post OP 2d III', 'Urin post OP 2d IV',
        'Urin post OP 7d I', 'Urin post OP 7d II', 'Urin post OP 7d III', 'Urin post OP 7d IV',
        'Urin post OP 14d I', 'Urin post OP 14d II', 'Urin post OP 14d III', 'Urin post OP 14d IV'
      ][i]
    }));
    differenzierungsmerkmalOptions = [
      { id: 1, text: "Katheter" },
      { id: 2, text: "Spontan" },
    ];
  } else if (probenart === 'gewebe') {
    probeninformationOptions = Array.from({ length: 14 }, (_, i) => ({
      id: i + 9,
      probeninformation_text: [
        'Normal Cryo I (MF)', 'Normal Cryo II (SF)', 'Normal Cryo III (SF)', 'Normal Cryo IV (SF)',
        'Normal Cryo V (SF)', 'Normal Cryo VI (SF)', 'Normal Trizol',
        'Tumor Cryo I (MF)', 'Tumor Cryo II (SF)', 'Tumor Cryo III (SF)', 'Tumor Cryo IV (SF)',
        'Tumor Cryo V (SF)', 'Tumor Cryo VI (SF)', 'Tumor Trizol'
      ][i]
    }));
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
