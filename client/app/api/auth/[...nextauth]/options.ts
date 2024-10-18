import { LOGIN_URL } from "@/lib/apiEndPoints";
import axios from "axios";
import { Account, AuthOptions, ISODateString, Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google"

export interface CustomSession {
    user?: CustomUser | undefined;
    espires: ISODateString;
}

export interface CustomUser {
    id?:string|null;
    name?:string|null;
    email?:string|null;
    image?:string|null;
    provider?:string|null;
    token?:string|null;
}

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/"
    }, 
    callbacks: {
        async signIn({user, account}: {user: CustomUser, account: Account | null}) {
            try {
                // console.log('User data is: ', user);
                // console.log('Account data is: ', account);

                const payload = {
                    email: user.email,
                    name: user.name,
                    oauth_id: account?.providerAccountId,
                    provider: account?.provider,
                    image: user?.image
                }

                const {data} = await axios.post(LOGIN_URL, payload);

                user.id = data?.user?.id.toString()
                user.token = data?.user?.token
                user.provider = data?.user?.provider

                return true;
                
            } catch (error) {
                console.log(error);
                
                return false;
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async session({ session, user, token }: {session:Session, user:CustomUser, token: JWT}) {
            session.user = token.user as CustomUser
            return session;
          },
          async jwt({ token, user}) {
            if(user) {
                token.user = user
            }
            return token
          }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
          })
    ]
}