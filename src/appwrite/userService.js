import { Client, Users } from 'node-appwrite';
import envConf from '@/envConf/envConf';

class UserService {
    constructor() {
        this.client = new Client()
          .setEndpoint(envConf.appwriteEndpoint)
          .setProject(envConf.appwriteProjectID)
          .setKey(envConf.appwriteKey);
    
        this.users = new Users(this.client);
      }

      async deleteAccount ({userID}){
        try {
            const result = await this.users.delete(userID);
            return result ? result : null;
          } catch (error) {
            console.log("Account deletion error:", error);
          }
      }
}

const userService = new UserService();

export default userService;