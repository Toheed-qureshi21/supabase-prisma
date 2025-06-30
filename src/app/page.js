import { api } from "@/libs/api-calling";
import { headers } from "next/headers";
import MainComponent from "@/components/MainComponent";


export default async function Home(req) {
  const headersList = await headers()
  const userId = headersList.get("x-user-id")
 const {data }= await api.get(`/getProfile/${userId}`);

 
  
  

  return (
    <MainComponent user={data.user}/>
   
  );
}
