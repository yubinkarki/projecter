import storage from "redux-persist/lib/storage";

const clearLocalPersistAction = async () => {
  await storage.removeItem("persist:root");
};

export default clearLocalPersistAction;
