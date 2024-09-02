import { Client, Databases, Storage, ID } from "appwrite";
import envConf from "../envConf/envConf";

class ManageCartService {
  constructor() {
    this.client = new Client()
      .setEndpoint(envConf.appwriteEndpoint)
      .setProject(envConf.appwriteProjectID);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // CRUD operation for Cart
  async createCart(cart){
    const { slug, userID, userName, cartItem, bookedItems } = cart;
    console.log(cart)
    try {
      const doc = await this.database.createDocument(
        envConf.appwriteDatabaseID,
        envConf.appwriteCollectionID,
        slug,
        {
          userID,
          userName,
          cartItem ,
          bookedItems,
        }
      );
      console.log("cart creation succes")
      return doc;
    } catch (error) {
      console.log("Appwrite service :: createCart :: error", error);
      return null;
    }
  }

  async updateCart({ slug, userID, userName, cartItem, bookedItems }){
    try {
      const doc = await this.database.updateDocument(
        envConf.appwriteDatabaseID,
        envConf.appwriteCollectionID,
        slug,
        {userID : userID,userName : userName, cartItem: cartItem, bookedItems : bookedItems }
      );
      console.log("cart updation succes")
      return doc;
    } catch (error) {
      console.log("Appwrite service :: updateCart :: error", error);
      return null;
    }
  }

  async getCart() {
    try {
      const carts = await this.database.listDocuments(
        envConf.appwriteDatabaseID,
        envConf.appwriteCollectionID,
        []
      );
      console.log(`get cart success`)
      return carts;
    } catch (error) {
      console.log("Appwrite service :: getCart :: error", error);
      return null;
    }
  }

  async deleteCart(slug) {
    try {
      await this.database.deleteDocument(
        envConf.appwriteDatabaseID,
        envConf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteCart :: error", error);
      return false;
    }
  }

  // File upload, in this case it's going to be an image
  async uploadFile(file) {
    try {
      const result = await this.storage.createFile(
        envConf.appwriteBucketID,
        ID.unique(),
        file
      );
      return result ? result : null;
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileID) {
    try {
      const result = await this.storage.deleteFile(
        envConf.appwriteBucketID,
        fileID
      );
      return result ? result : null;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileID) {
    try {
      const result = this.storage.getFilePreview(
        envConf.appwriteBucketID,
        fileID
      );
      return result ? result : null;
    } catch (error) {
      console.log("Appwrite serive :: getFilePreview :: error", error);
      return false;
    }
  }
}

const manageCartService = new ManageCartService();
export default manageCartService;
