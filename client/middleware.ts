export {default} from "next-auth/middleware";

export const config = {
    //private routes
    matcher: ["/dashboard"]
}