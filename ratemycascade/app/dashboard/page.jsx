import UserInfo from "@/components/UserInfo";
import {getServerSession} from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function generateMetaData() {
    const session = await getServerSession(authOptions);
    if(!session){
        return (
            <div>
                <p>You need to be logged in to view this page.</p>         
            </div>
        );
    }
}
export default async function DashBoard() {
    const session = await getServerSession(authOptions);
    if(!session){
        return (
            <div>
                <p>You need to be logged in to view this page.</p>
                
            </div>
        );
    }
    return(
        <UserInfo />
    )
}


