'use client'
import Document from "@/components/Document";

function Documentpage({params: {id}}:{
    params:{
        id:string;
    }
}) {
  return (
    <div className="flex flex-1 flex-col min-h-screen">
        <Document id={id} />
        </div>
  )
}

export default Documentpage