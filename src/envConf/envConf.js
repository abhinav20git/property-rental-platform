const envConf = {
    appwriteEndpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    appwriteProjectID: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteKey: String(process.env.NEXT_PUBLIC_APPWRITE_KEY),
    appwriteDatabaseID: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteCollectionID: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID),
    appwriteBucketID: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
    myEmail : String(process.env.NEXT_PUBLIC_EMAIL_USER),
    myPassword : String(process.env.NEXT_PUBLIC_EMAIL_PASS),
    razorpayKeyID : String(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),
    razorpayKeySecret: String(process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET),
    githubClientID : String(process.env.GITHUB_CLIENT_ID),
    githubClientSecret : String(process.env.GITHUB_CLIENT_SECRET),
};

export default envConf;
