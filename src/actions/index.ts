'use server'
 
export async function getFirmByPage(page:number) {
  try {
     console.log(page);
    
  } catch (error) {
    throw new Error("Server action: getFirmByPage error")
  }
  
}