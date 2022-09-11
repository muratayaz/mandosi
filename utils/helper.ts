import moment from "moment";

const ISOtimestampsDate = (date: string): string => {
  return moment(date).format("YYYY-MM-DDThh:mm:ss.sssZ");
};

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default {
  ISOtimestampsDate,
  convertBase64,
};
