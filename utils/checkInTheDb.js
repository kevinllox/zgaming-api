import dbExecutionMessages from "./const/consts.js";

/* 
Este método imprimirá un mensaje de error si la data precargada ya existe 
en la base de datos. Para asi no cargar de nuevo la data y evitarnos duplicidad de información.
*/
const checkInDbMessage = async (messageId, countFields, executePrisma) => {
  if (!countFields) {
    await executePrisma;
    console.error(dbExecutionMessages[messageId].error);
    return;
  }
  console.log(dbExecutionMessages[messageId].success);
};

export default checkInDbMessage;
