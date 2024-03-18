const parseDataFromStorage
= <T, T2>(dataName: string, emptyVar: T2): T => {
  const dataInstorage = localStorage.getItem(dataName);

  const parsedData = dataInstorage
    ? JSON.parse(dataInstorage)
    : emptyVar;

  return parsedData;
};

export default parseDataFromStorage;
