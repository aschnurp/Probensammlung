export const getProbeOptions = (probenart) => {
  const sampleTypes = ["gewebe", "serum", "urin", "paraffin", "galle", "stuhl", "edtaplasma"];
  if (!sampleTypes.includes(probenart)) {
    return {
      übergeordnete: [],
      untergeordnete: [],
      differenzierungsmerkmal: [],
      probeninformation: [],
      probeninformationLTX: [],
    };
  }

  let overgeordneteProbeOptions = [];
  let untergeordneteOptions = [];
  let differenzierungsmerkmalOptions = [];
  let probeninformationOptions = [];
  let probeninformationLTXOptions = [];

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

  } else if (probenart === 'urin') {
    differenzierungsmerkmalOptions = [
      { id: 1, text: "Katheter" },
      { id: 2, text: "Spontan" },
    ];
  } else if (probenart === 'gewebe') {
    differenzierungsmerkmalOptions = [
      { id: 1, text: "Regeneriert" },
      { id: 2, text: "Embolisiert" },
      { id: 3, text: "Empfänger" },
      { id: 4, text: "Spender" },
      { id: 5, text: "Spender nach Perfusion" },
    ];
  }
  else if (probenart === 'serum') {
    differenzierungsmerkmalOptions = [
      { id: 1, text: "Lebervene Links" },
      { id: 2, text: "Lebervene Rechts" },
      { id: 3, text: "ZVK" },
      { id: 4, text: "Vene peripher" },
      { id: 5, text: "Arterie peripher" },
    ];
  }

  const probeDataLTX = [
    { id: 1, text: "Galle intra OP von expl. Leber (PCR) I", type: "galle" },
    { id: 2, text: "Galle intra OP von expl. Leber (PCR) II", type: "galle" },
    { id: 3, text: "Galle intra OP von expl. Leber III", type: "galle" },
    { id: 4, text: "Galle intra OP von expl. Leber IV", type: "galle" },
    { id: 5, text: "Galle intra OP von expl. Leber (Rest)", type: "galle" },
    { id: 6, text: "Galle intra OP von impl. Leber (PCR) I", type: "galle" },
    { id: 7, text: "Galle intra OP von impl. Leber (PCR) II", type: "galle" },
    { id: 8, text: "Galle intra OP von impl. Leber III", type: "galle" },
    { id: 9, text: "Galle intra OP von impl. Leber IV", type: "galle" },
    { id: 10, text: "Galle intra OP von impl. Leber (Rest)", type: "galle" },
    { id: 11, text: "Galle post OP 1d von impl. Leber (PCR) I", type: "galle" },
    { id: 12, text: "Galle post OP 1d von impl. Leber (PCR) II", type: "galle" },
    { id: 13, text: "Galle post OP 1d von impl. Leber III", type: "galle" },
    { id: 14, text: "Galle post OP 1d von impl. Leber IV", type: "galle" },
    { id: 15, text: "Galle post OP 1d von impl. Leber (Rest)", type: "galle" },
    { id: 16, text: "Galle post OP 1d von impl. Leber (PCR) I", type: "galle" },
    { id: 17, text: "Galle post OP 7d von impl. Leber (PCR) II", type: "galle" },
    { id: 18, text: "Galle post OP 7d von impl. Leber III", type: "galle" },
    { id: 19, text: "Galle post OP 7d von impl. Leber IV", type: "galle" },
    { id: 20, text: "Galle post OP 7d von impl. Leber (Rest)", type: "galle" },
    { id: 21, text: "Galle post OP 14d von impl. Leber (PCR) I", type: "galle" },
    { id: 22, text: "Galle post OP 14d von impl. Leber (PCR) II", type: "galle" },
    { id: 23, text: "Galle post OP 14d von impl. Leber III", type: "galle" },
    { id: 24, text: "Galle post OP 14d von impl. Leber IV", type: "galle" },
    { id: 25, text: "Galle post OP 14d von impl. Leber (Rest)", type: "galle" },
    { id: 26, text: "EDTA-Plasma bei Aufklährung I", type: "edtaplasma" },
    { id: 27, text: "EDTA-Plasma bei Aufklährung II", type: "edtaplasma" },
    { id: 28, text: "EDTA-Plasma bei Aufklährung III", type: "edtaplasma" },
    { id: 29, text: "EDTA-Plasma bei Aufklährung IV", type: "edtaplasma" },
    { id: 30, text: "EDTA-Plasma prä OP I", type: "edtaplasma" },
    { id: 31, text: "EDTA-Plasma prä OP II", type: "edtaplasma" },
    { id: 32, text: "EDTA-Plasma prä OP III", type: "edtaplasma" },
    { id: 33, text: "EDTA-Plasma prä OP IV", type: "edtaplasma" },
    { id: 34, text: "EDTA-Plasma post OP 1d I", type: "edtaplasma" },
    { id: 35, text: "EDTA-Plasma post OP 1d II", type: "edtaplasma" },
    { id: 36, text: "EDTA-Plasma post OP 1d III", type: "edtaplasma" },
    { id: 37, text: "EDTA-Plasma post OP 1d IV", type: "edtaplasma" },
    { id: 38, text: "EDTA-Plasma post OP 7d I", type: "edtaplasma" },
    { id: 39, text: "EDTA-Plasma post OP 7d II", type: "edtaplasma" },
    { id: 40, text: "EDTA-Plasma post OP 7d III", type: "edtaplasma" },
    { id: 41, text: "EDTA-Plasma post OP 7d IV", type: "edtaplasma" },
    { id: 42, text: "EDTA-Plasma post OP 14d I", type: "edtaplasma" },
    { id: 43, text: "EDTA-Plasma post OP 14d II", type: "edtaplasma" },
    { id: 44, text: "EDTA-Plasma post OP 14d III", type: "edtaplasma" },
    { id: 45, text: "EDTA-Plasma post OP 14d IV", type: "edtaplasma" },
    {id: 46, text:"Stuhl prä OP I", type:"stuhl"},
    {id: 47, text:"Stuhl prä OP III", type:"stuhl"},
    {id: 48, text:"Stuhl prä OP IV", type:"stuhl"},
    {id: 49, text:"Stuhl post OP 1d I", type:"stuhl"},
    {id: 50, text:"Stuhl post OP 1d II", type:"stuhl"},
    {id: 51, text:"Stuhl post OP 1d III", type:"stuhl"},
    {id: 52, text:"Stuhl post OP 1d IV", type:"stuhl"},
    {id: 53, text:"Stuhl post OP 7d I", type:"stuhl"},
    {id: 54, text:"Stuhl post OP 7d II", type:"stuhl"},
    {id: 55, text:"Stuhl post OP 7d III", type:"stuhl"},
    {id: 56, text:"Stuhl post OP 7d IV", type:"stuhl"},
    {id: 57, text:"Stuhl post OP 14d I", type:"stuhl"},
    {id: 58, text:"Stuhl post OP 14d II", type:"stuhl"},
    {id: 59, text:"Stuhl post OP 14d III", type:"stuhl"},
    {id: 60, text:"Stuhl post OP 14d IV", type:"stuhl"},
]

  probeninformationLTXOptions = probeDataLTX
  .filter((probe) => probe.type === probenart)
  .map((probe) => ({ id: probe.id, probeninformation_text: probe.text }));

  const probeData = [
    { id: 1, text: "Serum prä OP I", type: "serum" },
    { id: 2, text: "Serum prä OP II", type: "serum" },
    { id: 3, text: "Serum prä OP III", type: "serum" },
    { id: 4, text: "Serum prä OP IV", type: "serum" },
    { id: 5, text: "Urin prä OP I", type: "urin" },
    { id: 6, text: "Urin prä OP II", type: "urin" },
    { id: 7, text: "Urin prä OP III", type: "urin" },
    { id: 8, text: "Urin prä OP IV", type: "urin" },
    { id: 9, text: "Normal Cryo I (MF)", type: "gewebe" },
    { id: 10, text: "Normal Cryo II (SF)", type: "gewebe" },
    { id: 11, text: "Normal Cryo III (SF)", type: "gewebe" },
    { id: 12, text: "Normal Cryo IV (SF)", type: "gewebe" },
    { id: 13, text: "Normal Cryo V (SF)", type: "gewebe" },
    { id: 14, text: "Normal Cryo VI (SF)", type: "gewebe" },
    { id: 15, text: "Normal Trizol", type: "gewebe" },
    { id: 16, text: "Tumor Cryo I (MF)", type: "gewebe" },
    { id: 17, text: "Tumor Cryo II (SF)", type: "gewebe" },
    { id: 18, text: "Tumor Cryo III (SF)", type: "gewebe" },
    { id: 19, text: "Tumor Cryo IV (SF)", type: "gewebe" },
    { id: 20, text: "Tumor Cryo V (SF)", type: "gewebe" },
    { id: 21, text: "Tumor Cryo VI (SF)", type: "gewebe" },
    { id: 22, text: "Tumor Trizol", type: "gewebe" },
    { id: 23, text: "Serum intra OP I", type: "serum" },
    { id: 24, text: "Serum intra OP II", type: "serum" },
    { id: 25, text: "Serum intra OP III", type: "serum" },
    { id: 26, text: "Serum intra OP IV", type: "serum" },
    { id: 27, text: "Serum post OP 1d I", type: "serum" },
    { id: 28, text: "Serum post OP 1d II", type: "serum" },
    { id: 29, text: "Serum post OP 1d III", type: "serum" },
    { id: 30, text: "Serum post OP 1d IV", type: "serum" },
    { id: 31, text: "Serum post OP 2d I", type: "serum" },
    { id: 32, text: "Serum post OP 2d II", type: "serum" },
    { id: 33, text: "Serum post OP 2d III", type: "serum" },
    { id: 34, text: "Serum post OP 2d IV", type: "serum" },
    { id: 35, text: "Serum post OP 7d I", type: "serum" },
    { id: 36, text: "Serum post OP 7d II", type: "serum" },
    { id: 37, text: "Serum post OP 7d III", type: "serum" },
    { id: 38, text: "Serum post OP 7d IV", type: "serum" },
    { id: 39, text: "Serum post OP 14d I", type: "serum" },
    { id: 40, text: "Serum post OP 14d II", type: "serum" },
    { id: 41, text: "Serum post OP 14d III", type: "serum" },
    { id: 42, text: "Serum post OP 14d IV", type: "serum" },
    { id: 43, text: "Urin intra OP I", type: "urin" },
    { id: 44, text: "Urin intra OP II", type: "urin" },
    { id: 45, text: "Urin intra OP III", type: "urin" },
    { id: 46, text: "Urin intra OP IV", type: "urin" },
    { id: 47, text: "Urin post OP 1d I", type: "urin" },
    { id: 48, text: "Urin post OP 1d II", type: "urin" },
    { id: 49, text: "Urin post OP 1d III", type: "urin" },
    { id: 50, text: "Urin post OP 1d IV", type: "urin" },
    { id: 51, text: "Urin post OP 2d I", type: "urin" },
    { id: 52, text: "Urin post OP 2d II", type: "urin" },
    { id: 53, text: "Urin post OP 2d III", type: "urin" },
    { id: 54, text: "Urin post OP 2d IV", type: "urin" },
    { id: 55, text: "Urin post OP 7d I", type: "urin" },
    { id: 56, text: "Urin post OP 7d II", type: "urin" },
    { id: 57, text: "Urin post OP 7d III", type: "urin" },
    { id: 58, text: "Urin post OP 7d IV", type: "urin" },
    { id: 59, text: "Urin post OP 14d I", type: "urin" },
    { id: 60, text: "Urin post OP 14d II", type: "urin" },
    { id: 61, text: "Urin post OP 14d III", type: "urin" },
    { id: 62, text: "Urin post OP 14d IV", type: "urin" },
  ];

  probeninformationOptions = probeData
    .filter((probe) => probe.type === probenart)
    .map((probe) => ({ id: probe.id, probeninformation_text: probe.text }));

  return {
    übergeordnete: overgeordneteProbeOptions,
    untergeordnete: untergeordneteOptions,
    differenzierungsmerkmal: differenzierungsmerkmalOptions,
    probeninformation: probeninformationOptions,
    probeninformationLTX: probeninformationLTXOptions
  };
};
